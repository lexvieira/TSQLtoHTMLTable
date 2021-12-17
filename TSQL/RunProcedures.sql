['Person.Person_EM', 'Person.PersonType_QTD', 'Sales.VW_SalesTerritory', 'Sales.SalesTerritory_Group'];
GO

dbo.SP_Render_HTML_Table 'Person.Person_EM' 

GO

dbo.SP_Render_HTML_Table 'Person.PersonType_QTD'

GO

dbo.SP_Render_HTML_Table 'Sales.VW_SalesTerritory'

GO

dbo.SP_Render_HTML_Table 'Sales.SalesTerritory_Group'


SELECT
    (SELECT 'BusinessEntityID'AS th FOR 
        XML PATH(''),TYPE),
        (SELECT 'PersonType'AS th FOR XML PATH(''),TYPE),
        (SELECT 'FirstName'AS th FOR XML PATH(''),TYPE),
        (SELECT 'MiddleName'AS th FOR XML PATH(''),TYPE),
        (SELECT 'LastName'AS th FOR XML PATH(''),TYPE),
        (SELECT 'ModifiedDate'AS th FOR XML PATH(''),TYPE) 
FOR XML PATH('tr'),ROOT('thead'),TYPE

SELECT
    (SELECT BusinessEntityID AS '*' FOR XML PATH('td'),TYPE)
    ,(SELECT PersonType AS '*' FOR XML PATH('td'),TYPE)
    ,(SELECT FirstName AS '*' FOR XML PATH('td'),TYPE)
    ,(SELECT MiddleName AS '*' FOR XML PATH('td'),TYPE)
    ,(SELECT LastName AS '*' FOR XML PATH('td'),TYPE)
    ,(SELECT ModifiedDate AS '*' FOR XML PATH('td'),TYPE) 
from Person.Person_EM for xml path('tr'),TYPE

SELECT
    (SELECT Detail AS '*' FOR XML PATH('td'),TYPE)
    ,(SELECT PersonType AS '*' FOR XML PATH('td'),TYPE)
    ,(SELECT Total AS '*' FOR XML PATH('td'),TYPE) 
        from Person.PersonType_QTD 
    FOR XML PATH('tr'),ROOT('tbody'),TYPE