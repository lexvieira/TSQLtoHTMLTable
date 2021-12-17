USE MY_DB 

GO

CREATE TABLE [dbo].[tblDictionary] (
    [intIDColumn]          INT           IDENTITY (1, 1) NOT NULL PRIMARY KEY,
    [intIDColumnSys]       INT           NULL,
    [chrSchemaName]        VARCHAR (200) NOT NULL,
    [chrIdentificadorName] VARCHAR (200) NULL,
    [chrTableName]         VARCHAR (200) NULL,
    [chrFieldName]         VARCHAR (200) NULL,
    [chrIdioma]            VARCHAR (30)  NOT NULL,
    [chrTraducao]          VARCHAR (100) NULL,
    [intOrder]             INT           NULL,
    [intActivo]            INT           CONSTRAINT [DF__tblTable___intAc__23D4EEA7] DEFAULT ((1)) NOT NULL,
    [dtdTimeStamp]         DATETIME2 (7) CONSTRAINT [DF__tblTable___dtdTi__24C912E0] DEFAULT (getdate()) NOT NULL,
);

GO


SELECT * FROM dbo.tblDictionary
GO

IF 1 = 0
BEGIN
    INSERT INTO dbo.tblDictionary (
        [chrSchemaName],
        [chrIdentificadorName],
        [chrTableName],
        [chrFieldName],
        [chrIdioma],
        [chrTraducao],
        [intOrder]     
    )
    SELECT  
        --[intIDColumnSys],
        'dbo' [chrSchemaName],
        'tbUsers' [chrIdentificadorName],
        'Users' [chrTableName],
        'idUser' [chrFieldName],
        'pt-br' [chrIdioma],
        'Id do Usuário' [chrTraducao],
        '1' [intOrder]   
    UNION 
    SELECT  
        --[intIDColumnSys],
        'dbo' [chrSchemaName],
        'tbUsers' [chrIdentificadorName],
        'Users' [chrTableName],
        'Nome' [chrFieldName],
        'pt-br' [chrIdioma],
        'Nome' [chrTraducao],
        '2' [intOrder] 
    UNION 
    SELECT  
        --[intIDColumnSys],
        'dbo' [chrSchemaName],
        'tbUsers' [chrIdentificadorName],
        'Users' [chrTableName],
        'FullName' [chrFieldName],
        'pt-br' [chrIdioma],
        'Nome Completo' [chrTraducao],
        '3' [intOrder] 
    UNION 
    SELECT  
        --[intIDColumnSys],
        'dbo' [chrSchemaName],
        'tbUsers' [chrIdentificadorName],
        'Users' [chrTableName],
        'Address' [chrFieldName],
        'pt-br' [chrIdioma],
        'Endereço' [chrTraducao],
        '4' [intOrder] 
    UNION 
    SELECT  
        --[intIDColumnSys],
        'dbo' [chrSchemaName],
        'tbUsers' [chrIdentificadorName],
        'Users' [chrTableName],
        'ZipCode' [chrFieldName],
        'pt-br' [chrIdioma],
        'CEP' [chrTraducao],
        '5' [intOrder] 
    UNION 
    SELECT  
        --[intIDColumnSys],
        'dbo' [chrSchemaName],
        'tbUsers' [chrIdentificadorName],
        'Users' [chrTableName],
        'TimeStamp' [chrFieldName],
        'pt-br' [chrIdioma],
        'Data' [chrTraducao],
        '6' [intOrder] 
END
