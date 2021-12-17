
ALTER VIEW Person.PersonType_QTD 
AS
SELECT 
        (SELECT             'ahrefPersonType' + Person.PersonType       AS 'a/@name'
							,'ahrefPersonType' + Person.PersonType         AS 'a/@id'
							,'/SalesDetail/' + Person.PersonType       AS 'a/@href'						
							,Person.PersonType AS 'a'
        FOR XML PATH(''), TYPE) Detail,
Person.PersonType, COUNT(*) 
Total 
FROM [AdventureWorks2017].[Person].[Person]
GROUP BY Person.PersonType

