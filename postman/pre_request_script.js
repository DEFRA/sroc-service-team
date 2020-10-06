// Use to automate refreshing the AWS cognito bearer token in Postman
//
// Thanks to the following sources for helping to put this
// together
// https://nicolaswidart.com/blog/automatically-set-authentication-tokens-in-postman-requests
// https://medium.com/@allen.helton/how-to-automate-oauth2-token-renewal-in-postman-864420d381a0
// https://stackoverflow.com/a/55614206/6117745
// https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html

const sdk = require('postman-collection')

// We need to support requests against endpoints that require different
// credentials. We keep the code generic by referencing the environment
// variables that hold those credentials using these variables. We default
// to the 'system' versions as they will be used in the majority of cases.
let tokenVar = 'systemToken'
let tokenTimestampVar = 'systemTokenTimestamp'
let tokenExpiresInVar = 'systemExpiresIn'
let oauthUserVar = 'systemUser'
let oauthPassVar = 'systemPass'

const authServiceUrl = pm.environment.get('tokenUrl')

if (automateToken()) {
  console.log('CHA API - Automating token')
  // Check if the request is to an admin endpoint. It includes so update the variables

  if (requestRequiresAdmin()) {
    updateEnvironmentReferencesToAdmin()
    console.log('CHA API - Admin path determined. Using admin env vars.')
  }

  if (tokenRefreshNeeded()) {
    console.log('CHA API - Refresh of token needed')
    refreshToken()
  }
}

function automateToken () {
  let automate = pm.environment.get('automateToken') || 'true'

  if (automate === 'true') {
    automate = true
  } else {
    automate = false
  }

  return automate
}

function requestRequiresAdmin () {
  const path = pm.request.url.getPath()
  const regex = RegExp('(authorised_systems|regime)', 'i')

  return regex.test(path)
}

// Update the values we use to reference to environment variables
// to use the admin alternatives
function updateEnvironmentReferencesToAdmin () {
  tokenVar = 'adminToken'
  tokenTimestampVar = 'adminTokenTimestamp'
  tokenExpiresInVar = 'adminExpiresIn'
  oauthUserVar = 'adminUser'
  oauthPassVar = 'adminPass'
}

// Compares the current token's timestamp against the current time
// in UTC. If the difference in milliseconds is greater than
// tokenExpiresInAsMilliseconds() then a refresh is needed
function tokenRefreshNeeded () {
  // Date.now() returns the number of milliseconds since 1970-01-01
  const difference = (Date.now() - timestampAsMilliseconds())

  return difference >= tokenExpiresInAsMilliseconds()
}

// When we successfully request a token we record a timestamp
// in the environment variables.
function timestampAsMilliseconds () {
  // Set a default in case we don't have a timestamp in the env vars
  let result = Date.UTC(2010, 0, 1)
  const tokenTimestamp = pm.environment.get(tokenTimestampVar)

  if (tokenTimestamp) {
    result = tokenTimestamp
  }

  return result
}

// When we successfully request a token we record how long the token
// will be valid for (expressed as seconds) in the environment variables.
// As we need to deal in milliseconds this function takes that value (or
// a default if the env var doesn't exist) and converts it to millseconds.
function tokenExpiresInAsMilliseconds () {
  // Set a default in case we don't have a timestamp in the env vars
  let result = 3600
  const tokenExpiresIn = pm.environment.get(tokenExpiresInVar)

  if (tokenExpiresIn) {
    result = tokenExpiresIn
  }

  return result * 1000
}

function encodedKeys () {
  const keys = pm.environment.get(oauthUserVar) + ':' + pm.environment.get(oauthPassVar)

  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(keys));
}

function refreshToken () {
  const tokenRequest = new sdk.Request({
    url: authServiceUrl,
    method: 'POST',
    header: [
      new sdk.Header({
        key: 'content-type',
        value: 'application/x-www-form-urlencoded'
      }),
      new sdk.Header({
        key: 'acccept',
        value: 'application/json'
      }),
      new sdk.Header({
        key: 'Authorization',
        value: 'Basic ' + encodedKeys()
      })
    ],
    body: {
      mode: 'urlencoded',
      urlencoded: [
        { key: 'grant_type', value: 'client_credentials' },
      ]
    }
  })

  pm.sendRequest(tokenRequest, function (err, response) {
    if (err) {
      throw err
    }

    if (response.code !== 200) {
      throw new Error('Could not log in.')
    }

    pm.environment.set(tokenVar, response.json().access_token)
    pm.environment.set(tokenExpiresInVar, response.json().expires_in)
    pm.environment.set(tokenTimestampVar, Date.now());
    console.log(`New token has been set: ${response.json().access_token}`);
  })
}
