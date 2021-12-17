
ALTER VIEW Sales.SalesTerritory_Group AS
SELECT
    [Group] GroupedRegions
    ,COUNT(CountryRegionCode) CountryRegions
    ,FORMAT(SUM(SalesYTD), 'C', 'EN-US') TotalSalesYTD
    ,FORMAT(SUM(SalesLastYear), 'C', 'EN-US') TotalSalesLastYear
FROM Sales.SalesTerritory
GROUP BY [Group]
