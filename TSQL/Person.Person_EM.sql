ALTER VIEW Person.Person_EM
AS
SELECT TOP (10) 
       [BusinessEntityID]
      ,[PersonType]
      ,[FirstName]
      ,[MiddleName]
      ,[LastName]
      ,CONVERT(VARCHAR(10),ModifiedDate,101) ModifiedDate 
  FROM [AdventureWorks2017].[Person].[Person]
  WHERE PersonType = 'EM'
  AND [ModifiedDate] IS NOT NULL 

GO
