ALTER VIEW Sales.VW_SalesTerritory
AS
SELECT
    TerritoryID
    ,Name
    ,CountryRegionCode
    ,[Group] GroupedRegions
    ,SalesYTD
    ,SalesLastYear
FROM Sales.SalesTerritory

GO
