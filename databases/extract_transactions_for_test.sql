/*
  Used to extract data on transactions stored in the Charging Module API into a
  format that QA use in their tests. The intention is having run the query you
  then export/download it as a CSV file.

  IMPORTANT! If you are extracting real data be sure to password protect it
  before transferring to QA.
*/
SELECT
	((row_number() OVER (PARTITION BY true))::integer) AS iteration,
	(tra.line_area_code) AS areaCode,
	(tra.regime_value_5::integer) AS authorisedDays,
	(tra.regime_value_1) AS batchNumber,
	(tra.regime_value_4::integer) AS billableDays,
	(tra.regime_value_3) AS chargeElementId,
	(tra.line_attr_2) AS chargePeriod,
	(tra.regime_value_17::boolean) AS compensationCharge,
	(tra.charge_credit) AS credit,
	(tra.customer_reference) AS customerReference,
	(tra.regime_value_13) AS eiucSource,
	(tra.line_attr_1) AS licenceNumber,
	(tra.line_description) AS lineDescription,
	(tra.regime_value_8) AS loss,
	(tra.new_licence) AS newLicence,
	(TO_CHAR(tra.charge_period_end, 'DD-MON-YY')) AS periodEnd,
	(TO_CHAR(tra.charge_period_start, 'DD-MON-YY')) AS periodStart,
	(tra.region) AS region,
	(tra.regime_value_15) AS regionalChargingArea,
	(tra.regime_value_7) AS season,
	(tra.regime_value_11::numeric) AS section126Factor,
	(tra.regime_value_12::boolean) AS section127Agreement,
	(tra.regime_value_9::boolean) AS section130Agreement,
	(tra.regime_value_6) AS source,
	(tra.regime_value_16::boolean) AS twoPartTariff,
	(tra.line_attr_5::numeric) AS volume,
	(tra.regime_value_14::boolean) AS waterUndertaker,
	(null) AS expChargeValue,
	(null) AS expSUC,
	(null) AS expSourceFactor,
	(null) AS expSeasonFactor,
	(null) AS expLossFactor,
	(null) AS expSection126Factor,
	(null) AS expSection127Factor,
	(null) AS expChargeElementAg,
	(null) AS expSection130Factor,
	(null) AS expSeasonEiucSource,
	(null) AS expSeasonEiuc,
	(charge_financial_year) AS FinancialYear,
	(null) AS SUMchargeValCustFY,
	(null) AS GroupchargeValCustFY,
	(null) AS CountRgnDebitGrps,
	(null) AS CountRgnDebitGrps,
	(null) AS SumRgnDebitGrps,
	(null) AS SumRgnDebitGrps,
	(null) AS CountRgnCreditGrps,
	(null) AS CountRgnCreditGrps,
	(null) AS SumRgnCreditGrps,
	(null) AS SumRgnCreditGrps,
	(null) AS SumRgnDebitGrps,
	(null) AS chgRounded
FROM transactions AS tra
