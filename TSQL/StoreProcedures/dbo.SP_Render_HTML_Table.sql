
CREATE PROCEDURE dbo.SP_Render_HTML_Table (@chrTableName         VARCHAR(200),
												   @chrIdentificadorName VARCHAR(200) = '',
												   @intIDExibirFooter    INT = 0,
												   @chrIDTable           VARCHAR(30) = NULL,
												   @intDropTempTable     INT = 1,
												   @chrValueForNull VARCHAR(10) = '')
AS
  BEGIN
	  DECLARE @chrColunasTableBody           VARCHAR(MAX) = NULL,
			  @chrColunasTableHeader         VARCHAR(MAX) = NULL,
			  @chrColunasTableFooter         VARCHAR(MAX) = '',
			  @chrColunasTableHeaderPlusBody VARCHAR(MAX) = NULL,
			  @chrTableNameValidacao         VARCHAR(200) = ''


	  --Returns the name of the table or the name of the temporary table used in the query.	
	  SET @chrTableNameValidacao = ( CASE
									   WHEN LEFT(@chrTableName, 1) = '#' THEN 'tempdb..' + @chrTableName
									   ELSE @chrTableName
									 END )

	  --> PRINT @chrTableNameValidacao -- TESTES NOME DA TABELA
	  --> HEADER
	  IF LEFT(@chrTableName, 1) = '#'
		BEGIN
			SELECT @chrColunasTableHeader = COALESCE( @chrColunasTableHeader, '') + CASE WHEN @chrColunasTableHeader <> '' THEN ',' ELSE '' END
											+ '(SELECT ''' + ISNULL(D.chrTraducao, C.NAME)
											+ '''AS th' + ' FOR XML PATH(' + CHAR(39)
											+ CHAR(39) + '),TYPE)'
			--SELECT *
			FROM   tempdb.sys.columns C
				   LEFT JOIN dbo.tblDictionary D
						  ON (D.chrIdentificadorName = @chrIdentificadorName OR D.chrSchemaName + '.' + D.chrTableName = @chrTableName)
							 AND D.chrFieldName = C.NAME
			WHERE  object_id = object_id(@chrTableNameValidacao)

			SET @chrIDTable = ISNULL(@chrIDTable, ( SUBSTRING(@chrTableName, 3, 100) ))
		END
	  ELSE
		BEGIN
			SELECT @chrColunasTableHeader = COALESCE( @chrColunasTableHeader, '') + CASE WHEN @chrColunasTableHeader <> '' THEN ',' ELSE '' END
											+ '(SELECT ''' + ISNULL(D.chrTraducao, C.NAME)
											+ '''AS th' + ' FOR XML PATH(' + CHAR(39)
											+ CHAR(39) + '),TYPE)'
			--SELECT *
			FROM   sys.columns C
				   LEFT JOIN dbo.tblDictionary D
						  ON (D.chrIdentificadorName = @chrIdentificadorName OR D.chrSchemaName + '.' + D.chrTableName = @chrTableName)
							 AND D.chrFieldName = C.NAME
			WHERE  object_id = object_id(@chrTableNameValidacao)

			SET @chrIDTable = ISNULL(@chrIDTable, SUBSTRING(@chrTableName, CHARINDEX('.', @chrTableName, 1) + 1, 100))
		END

	  --> FOOTER
	  IF @intIDExibirFooter <> 0
		SELECT @chrColunasTableFooter = '(SELECT' + @chrColunasTableHeader
										+ ' FOR XML PATH(' + CHAR(39) + 'tr' + CHAR(39)
										+ '),ROOT(' + CHAR(39) + 'tfoot' + CHAR(39)
										+ '),TYPE),'

	  --> FOOTER
	  --> HEADER
	  SELECT @chrColunasTableHeader = '(SELECT' + @chrColunasTableHeader
									  + ' FOR XML PATH(' + CHAR(39) + 'tr' + CHAR(39)
									  + '),ROOT(' + CHAR(39) + 'thead' + CHAR(39)
									  + '),TYPE),'

	  --> HEADER
	  --> ATÉ HEADER OK
	  --> SELECT @chrColunasTableHeader
	  --PRINT 'OK'
	  --> DADOS
	  IF LEFT(@chrTableName, 1) = '#'
		BEGIN
			SELECT @chrColunasTableBody = COALESCE( @chrColunasTableBody, '') + CASE WHEN @chrColunasTableBody <> '' THEN ',' ELSE '' END
			--(select seguradora as '*' for xml path('td'),type),
										  + '(SELECT ' + NAME + ' AS ' + CHAR(39) + '*' + CHAR(39)
										  + ' FOR XML PATH(' + CHAR(39) + 'td' + CHAR(39)
										  + '),TYPE)'
			FROM   tempdb.sys.columns
			WHERE  object_id = object_id(@chrTableNameValidacao)
		END
	  ELSE
		BEGIN
			SELECT @chrColunasTableBody = COALESCE( @chrColunasTableBody, '') + CASE WHEN @chrColunasTableBody <> '' THEN ',' ELSE '' END
										  + '(SELECT ' + NAME + ' AS ' + CHAR(39) + '*' + CHAR(39)
										  + ' FOR XML PATH(' + CHAR(39) + 'td' + CHAR(39)
										  + '),TYPE)'
			FROM   sys.columns
			WHERE  object_id = object_id(@chrTableNameValidacao)
		END

	  --> DADOS
	  --SELECT @chrColunasTableBody
	  SELECT @chrColunasTableBody = '(SELECT' + @chrColunasTableBody + ' from '
									+ @chrTableNameValidacao + ' for xml path('
									+ CHAR(39) + 'tr' + CHAR(39) + '),TYPE) '

	  SET @chrColunasTableHeaderPlusBody = ' DECLARE @chrRetHtml AS VARCHAR(MAX) 
									   SELECT @chrRetHtml = ( SELECT '
										   + CHAR(39) + @chrIDTable + CHAR(39) + ' AS '
										   + CHAR(39) + '@id' + CHAR(39) + ','
										   + @chrColunasTableHeader +
										   + @chrColunasTableFooter +
										   + @chrColunasTableBody + ' FOR XML PATH('
										   + CHAR(39) + 'table' + CHAR(39) + ') ) 
									 SELECT @chrRetHtml AS chrTable
									 
									 '

	  --SELECT @chrColunasTableBody
	  EXEC (@chrColunasTableHeaderPlusBody)

	  IF @intDropTempTable = 1
		 AND LEFT(@chrTableName, 1) = '#' AND OBJECT_ID(@chrTableNameValidacao) IS NOT NULL
		EXEC ('DROP TABLE ' + @chrTableName )
  END