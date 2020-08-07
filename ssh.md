# Guide to ssh

> At this time the guide only covers using ssh from a Mac. Any Windows users are happy to contribute!

This guide covers how to setup ssh for connecting to the TCM environment. It's not required you do it this way. But for those unsure or new hopefully it will help.

There are no tools to install as Mac's come with [OpenSSH](https://www.openssh.com/) built into the OS.

Only the TCM environment is accessible via SSH at this time. This is because the Charging Module API environment is Docker based.

## Example data

The values used in this guide are not real. By this we mean things like

- user names
- key file names
- host names (addresses)

They are an example only. Speak to [@cruikshanks](https://github.com/Cruikshanks) if you get stuck obtaining the real ones.

## Confirm your ssh version

For this to work you'll need to be using OpenSSH 7.3p1 or greater. You can check with

```bash
ssh -V
```

## Setup folders

You'll need to have the folder `~/.ssh` created. Don't be surprised if it doesn't exist when you go looking. If that's the case create it followed by another we'll use called `config.d`.

```bash
mkdir ~/.ssh
cd ~/.ssh
mkdir config.d
```

`config.d` is where we'll be adding our 'host' setup but more on that later.

## Create base config

Within `~/.ssh` create a file called `config`. Add the following to it

```bash
# To better manage the various services each has their own file containing the
# host config. Since ssh version 7.3p1 it has been possible to include
# other configuration files using the `Include` keyword.
#
# You can specify them individually e.g.
#
# Include config.d/tcm
#
# Or do as we do and keep all our hosts config in the ~/.ssh/config.d folder
# and include them all.
#
# See https://superuser.com/a/1142813 for details
Include config.d/*

# On macOS Sierra 10.12.2 or newer keys can be automatically loaded into ssh-agent
# and passphrases stored in the keychain.
Host *
  # Do not use this option. It adds unncessary keys to ssh-agent, which in turn
  # leads to the `Too many authentication failures for user` error when trying
  # to connect to a Jenkins slave once connected to a bastion server
  AddKeysToAgent yes
  UseKeychain yes
  # If you use an ssh-agent, ssh will automatically try to use the keys in the
  # agent, even if you have not specified them with in ssh_config's IdentityFile
  # (or -i) option. This is a common reason you might get the
  # `Too many authentication failures for user` error. Using the
  # `IdentitiesOnly yes` option will disable this behavior.
  # See http://superuser.com/a/436015 for more details
  # It should be noted however this only applies when connecting to the bastion
  # server. In order to connect to an environment's Jenkins slave we need to
  # forward the [ENV_SERVICE]KP.pem file. We do this by adding it to the
  # ssh-agent via ssh-add and specifying `ForwardAgent yes`. When on the
  # bastion server this flag no longer applies. So if `ssh-add -L` returns more
  # than 5 entries, you may be at risk of getting a
  # `Too many authentication failures for user` error. The only solution found
  # so far is to clear them out using `ssh-add -D` then re-add the key for the
  # env you are interested in
  IdentitiesOnly yes
  IdentityFile ~/.ssh/id_rsa

```

> The comments in the code explain whats going on. The notes around `Include config.d/*` are recent and this entry is definately required.
>
> The rest have been taken from a config file that has been moved across various Mac builds over the last 5 years. It definately works! But feel free to experiement and read deeper to find out if the comments and need for them is still accurate.

## Add ssh keys

First step, create another folder in `~/.ssh`

```bash
cd ~/.ssh
mkdir tcm
```

Into this drop the keys you'll need to connect. Typically this is 2 per environment; one to allow connection to the [bastion host](https://en.wikipedia.org/wiki/Bastion_host), another to allow connection to the servers from the bastion host.

> As it's likely will not have a consistent naming convention. We would advise you rename them to something more meaningful and consistent if that is the case

Then create a file in `~/.ssh` e.g. `tcm.sh` and add the following content

```bash
#!/bin/bash

# Ensure the permissions are correct on the keys. If they are to permissive ssh
# won't allow you to connect with them
chmod a-rwx ~/.ssh/tcm/*.pem
chmod u+rwx ~/.ssh/tcm/*.pem

# Clear all existing keys to avoid `Too many authentication failures for user`
# error
ssh-add -D

# Add the keys to ssh agent. Note, you do not add any bastion keys. ssh agent
# is the mechanism by which when we connect to the bastion, we also have the
# key loaded into the session that then allows us to access our servers from it.
/usr/bin/ssh-add -K ~/.ssh/tcm/tcm_dev.pem
/usr/bin/ssh-add -K ~/.ssh/tcm/tcm_tst.pem
/usr/bin/ssh-add -K ~/.ssh/tcm/tcm_pre.pem

echo "TCM keys added"

```

> You can call this manually when needed. Or setup an alias in ~/.zshrc, for example, `alias tcm='. ~/.ssh/tcm.sh'`

## Host file

Next create a file in `~/.ssh/config.d` called `tcm`. Add the following content

```bash
### TCM ########################################################################
# Development Bastion server
# Private key for TCM tcm_dev.pem
# Equivalent in a 1 liner
# ssh -A -o IdentitiesOnly=yes \
#   -i ~/.ssh/tcm/tcm_dev_bas.pem \
#   letmein@10.20.30.40
Host tcm-dv
  HostName 10.20.30.40
  Port 22
  User letmein
  IdentitiesOnly yes
  IdentityFile ~/.ssh/tcm/tcm_dev_bas.pem
  ForwardAgent yes
  ServerAliveInterval 30

# Test Bastion server
# Private key for TCM tcm_txt.pem
# Equivalent in a 1 liner
# ssh -A -o IdentitiesOnly=yes \
#   -i ~/.ssh/tcm/tcm_tst_bas.pem \
#   letmein@10.20.30.50
Host tcm-qa
  HostName 10.20.30.50
  Port 22
  User letmein
  IdentitiesOnly yes
  IdentityFile ~/.ssh/tcm/tcm_tst_bas.pem
  ForwardAgent yes
  ServerAliveInterval 30

# Pre-prod Bastion server
# Private key for TCM tcm_pre.pem
# Equivalent in a 1 liner
# ssh -A -o IdentitiesOnly=yes \
#   -i ~/.ssh/tcm/tcm_pre_bas.pem \
#   letmein@10.20.30.60
Host tcm-pp
  HostName 10.20.30.60
  Port 22
  User letmein
  IdentitiesOnly yes
  IdentityFile ~/.ssh/tcm/tcm_pre_bas.pem
  ForwardAgent yes
  ServerAliveInterval 30

```

You'll need to update the following items to their real values

- `User`
- `HostName`
- `IdentifyFile`

You are free to set the `Host`, for example, `tcm-dv` to whatever makes sense to you.

That's it. Restart the terminal to ensure everything is sourced correctly before you try and use this.

## Connect

You should now be ready to connect

```bash
. ~/.ssh/tcm.sh # Or just `tcm` if you have created the alias
ssh tcm-dv
```

If everything is setup correctly you should fine yourself on the bastion host. To then connect to a server you'll need to use `username@servername`, for example, `letmein@TCMBES01`. You can normally find servernames by looking at the local `hosts` file, for example, `cat /etc/hosts`.

## Other environments

This setup is flexible enough to work for other environments as well. You simply need to obtain the keys, then create a `.sh` script and host file.
