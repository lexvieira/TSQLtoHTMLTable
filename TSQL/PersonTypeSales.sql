ALTER VIEW Sales.PersonTypeSales
AS
SELECT 
   PersonType
  ,COUNT(PersonType) [Person by Type QTD]
  ,COUNT(SalesOrderID) [Number Of Orders] 
  ,FORMAT(Sum(TotalDue), 'C','en-us') [Total Due] 
FROM 
[AdventureWorks2017].[Person].[Person] P
LEFT JOIN Sales.Customer C
ON P.BusinessEntityID = C.PersonID
LEFT JOIN [AdventureWorks2017].Sales.SalesOrderHeader POH
ON C.CustomerID = POH.CustomerID
GROUP BY PersonType 

GO 

CREATE PROCEDURE Sales.PROC_PersonTypeSales (@PersonType VARCHAR(30) = NULL)
AS 
SELECT * FROM 
Sales.PersonTypeSales
WHERE PersonType = @PersonType

GO

EXEC Sales.PROC_PersonTypeSales @PersonType = 'IN'