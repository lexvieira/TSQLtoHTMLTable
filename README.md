# TSQL HTML Tables with Docker

Basic here were are going to use to methods to bring data from database SQL Server. 
* First - We will connect with the Database using the Knex library for NodeJs, return a simple json data and render it on the frontend.

* Second - We will call a store procedure that will bring the data from any table rendered in HTML, after we just will need to parse the html to avoid the risk of unwanted injection of unsafe HTML code in your website, see more at the article: [How to Use Static HTML with React](https://www.pluralsight.com/guides/how-to-use-static-html-with-react). This will reduce the coding on the backend and render just the HTML done on the frontend.

It is not to be a common tools to render all kind of data directly from the database, however by instance it could be useful when you need to render different kind of reports to present information online.

For this example we are going to use the `AdventuresWorks2017` available on https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2017.bak. That one is a database sample from Microsft replacing the `Northwind` of the `SQL Server 2005` 

More at [adventureworks Databases](https://github.com/microsoft/sql-server-samples/releases/tag/adventureworks)

For start you should have a SQL Server instance installed on your machine or use a Docker Version that you can turn it on in minutes. If you don't have a SQL Server you can see the project https://github.com/lexvieira/Docker-Sql-Server. To restore the database `Adventure Works 2017` see the project https://github.com/lexvieira/Docker-Sql-Server/blob/main/README.RestoreDB.en.md.

Once you have the database installed, let's go and configure our database to return the data from the database using our backend (folder server) and after present the data on the front-end.

## Configure Backend and FrontEnd

Basicly to run our code we need to configure our Backend and Frontend. The backend will be responsible to connect with the database, receive the data and send it to the frontend. The Frontend will be responsible to render de data for the user.  

Let's create our backend structure to return our data from the database.

If you never configured your backend and/or frontend, just take a look at this [Git Docker-Init-Nodejs-React-React-Native-SQLServer](https://github.com/lexvieira/Docker-Init-Nodejs-React-React-Native-SQLServer). It shows how to configure Backend with Node, Frontend with React and Mobile with React Native.

As we are using NPM, if you want to give `pull` of the project just give a `npm install` at the folder applications.

```
➜  TSQL-HTML-Table-Docker git:(master) ✗ cd server
➜  server git:(master) ✗ npm install
➜  server git:(master) ✗ cd ..
➜  TSQL-HTML-Table-Docker git:(master) ✗ cd web
➜  web git:(master) ✗ npm install
```

### Configure Database Connection with Knex

As we are going to connect with SQL Server database, but also could be a Mysql or even a SQLite we will use the `Knex` to manage and access the data from that databases. Again, in our case SQL Server :D. 

Let's create a database connetion to return the data from the SQL Server Database to the backend.

First let's add the packages: `Knex`, `mssql` and `tedious`.

```
➜  server git:(master) ✗
npm install knex
npm install mssql
npm install tedious
```

After include the packages, add a new file called knexfile.ts and include de second lines:

```typescript
import path from 'path';

module.exports = {
    client: 'mssql',
    connection: {
      host : '192.168.1.172',
      user : 'SA',
      password : 'JHu@hGTWSK@9t63',
      database : 'MY_DB'
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    }, 
    useNullAsDefault: true,
};

```
In our case we are not going to work with `Migrations and Seeds`, once we just going to rescue the data from the database.

One of the main things for the `knex` works in our project is create the `knexfile.ts` and the second is create the `connection file`. In this case it will be stored at the folder  `\src\database\connection.ts`.  

Remember to check the `IP Address` of your machine and the `database password`. if you have doubts, check it [here](https://github.com/lexvieira/Docker-Sql-Server)

```typescript
// import knex from 'knex';
import path from 'path';

const connection = require('knex')({
  client: 'mssql',
  connection: {
    host : '192.168.1.172',
    user : 'SA',
    password : 'JHu@hGTWSK@9t63',
    database : 'MY_DB'
  }
});

export default connection;

```

### Configure the basic Routes for our Application 

Once we have the `express` installed, we can create our routes to our backend application return data to de frontend.

For our Server run correctly we need to add a package and configure what we call of Routes that is basically the address of your page in the web.

Let's create our 2 main routes to access the data from our database. However, first we need to create our controllers to access the data from the database.

### Create Controllers

The controllers will process the user input and interact with the data model, receive the output process it and return it to the user as a response.

In this case we have a simple conroller that will access the user data and return the data for the request route. The controller is using the `Request, Response` from the `express` to receive the input from the route and responde after process the data. You can see that we are import the `knex` from our `database connection` as well.

```typescript
import { Request, Response } from 'express';
import knex from "../database/connection";

class UsersController {
    async index(request: Request, response: Response) {
        
        const users = await knex('Users');
        return response.json({
            users: users
        });
    }
}

export default UsersController;
```

This is a basic example return a `Json data` although we going to process the data in a differnt way return the HTML directly from the `store procedure` using `TSQL`.

### Creating Routes

To process the request of the frontend, the request must come from a request http method `GET, POST, PUT, DELETE ....` entre outros.

```typescript
import express from "express";

import UsersController from "./controllers/UsersController";
const userController = new UsersController();

const routes = express.Router();

routes.get('/', (request, response) => {
    response.send('Server is running');
});

routes.get('/userjson', userController.index);

routes.get('/usertsql', userController.userTSql);

export default routes;
```

Criamos duas rotas, a `/userjson` to return the data executing a select at the table users and the `/usertsql` that we will use to return the data HTML rendered with the SQL Server.

### Create TSQL HTML

As the idea here is return HTML Static to the frontend using TSQL (Transaction SQL) we need to create a dictionary table if we want to change the name of the field once sometimes the table fields are not so understandable for the user.

The basic format for the [dbo].[tblDictionary] is:

* [chrSchemaName]        - The schemma table, used at Sql Server as a collection of objects, the default is dbo.
* [chrIdentificadorName] - That will be our identificator in case of we have different tables with the same name or the same table with different field. It can be removed in the future. 
* [chrTableName]         - Basic the name of the table or View
* [chrFieldName]         - The name of the field of the table, it will be used to cross the data with the sys objects and columns to return the data of the table.
* [chrIdiom]             - The language that you want to translate the fields of the table. You can create many fields with many idioms, if the field is not found, the return will be the name of the column.
* [chrTraducao]          - The text that you want to showed at the fields of the table. If there is no translation for the field or the field is not found, the return will be the name of the column.          
* [intOrder]             - In case if you want to return the fields ordered by name.
* [intActivo]            - If the tranlation is active, if not, then the return will be the name of the column of the table.
* [dtdTimeStamp]         - Just the date of creationg of the register.

```sql
USE AdventureWorks2017 

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
    [intActivo]            INT           DEFAULT ((1)) NOT NULL,
    [dtdTimeStamp]         DATETIME2 (7) DEFAULT (getdate()) NOT NULL,
);

GO
```

So, once that we created the [dbo].[tblDictionary] table, we just need to create the procedure that will return any table that we need in `HTML format`. Here just a small `piece of code`, but the full code is available here: [TSQL/StoreProcedures/dbo.SP_Render_HTML_Table.sql](TSQL/StoreProcedures/dbo.SP_Render_HTML_Table.sql).

* @chrTableName         - The name of the table, must be informed as `schemma.tablename`, as informed before, `schemma` is the collections of objects in the database. In this example should be `dbo.tbluser`. `dbo` is always the default schemma for a SQL object.
* @chrIdentificadorName - The same from the [TblDictionary] -  That will be our identificator in case of we have different tables with the same name or the same table with different field. It can be removed in the future. 
* @intIDExibirFooter    - When you want to include a Footer for your table, just create add `1` for `true` and `0` for `false`. 
* @chrIDTable           - That will be the table ID for your `HTML table` for example <table id="tbUsers"></table>
* @intDropTempTable     - Drop the Temporary tables when the procedure finish the process.
* @chrValueForNull      - Difine a value to be returned in case of the values of the fields are [NULLs], the default is empty `''`. 

```sql
CREATE PROCEDURE dbo.SP_Render_HTML_Table (@chrTableName         VARCHAR(200),
												   @chrIdentificadorName VARCHAR(200) = '',
												   @intIDExibirFooter    INT = 0,
												   @chrIDTable           VARCHAR(30) = NULL,
												   @intDropTempTable     INT = 1,
												   @chrValueForNull VARCHAR(10) = '')

...
...
...

	  --> HEADER
	  SELECT @chrColunasTableHeader = '(SELECT' + @chrColunasTableHeader
									  + ' FOR XML PATH(' + CHAR(39) + 'tr' + CHAR(39)
									  + '),ROOT(' + CHAR(39) + 'thead' + CHAR(39)
									  + '),TYPE),'

	  --> FOOTER                    
	  IF @intIDExibirFooter <> 0
		SELECT @chrColunasTableFooter = '(SELECT' + @chrColunasTableHeader
										+ ' FOR XML PATH(' + CHAR(39) + 'tr' + CHAR(39)
										+ '),ROOT(' + CHAR(39) + 'tfoot' + CHAR(39)
										+ '),TYPE),'

	  --> DATA
	  IF LEFT(@chrTableName, 1) = '#'
		BEGIN
			SELECT @chrColunasTableBody = COALESCE( @chrColunasTableBody, '') + CASE WHEN @chrColunasTableBody <> '' THEN ',' ELSE '' END
			--(select seguradora as '*' for xml path('td'),type),
										  + '(SELECT ' + NAME + ' AS ' + CHAR(39) + '*' + CHAR(39)
										  + ' FOR XML PATH(' + CHAR(39) + 'td' + CHAR(39)
										  + '),TYPE)'
			FROM   tempdb.sys.columns
			WHERE  object_id = object_id(@chrTableNameValidacao)
```

The procedure basically renders `HTML tags` using the `FOR XML` clause to returns the result as a rowset. See https://docs.microsoft.com/en-us/sql/relational-databases/xml/for-xml-sql-server?view=sql-server-ver15. 

The result is compiled into a string and executed using the EXEC clause. It can be use to execute a store procedure or a query string, for example `EXEC 'SELECT * FROM tbl_users'`. See https://docs.microsoft.com/en-us/sql/t-sql/language-elements/execute-transact-sql?view=sql-server-ver15.

### Return data with the procedure dbo.SP_Render_HTML_Table

.....

## Reac Web

### Configure API with Axios

### Create page to Return the Data with Json

### Create page to Return the data renderized from the Database with TSQL

https://futurestud.io/tutorials/node-js-how-to-run-an-asynchronous-function-in-array-map

https://betterprogramming.pub/using-url-parameters-and-query-strings-with-react-router-fffdcea7a8e9
//To Decide:
//https://medium.com/@zeolearn/6-best-reactjs-based-ui-frameworks-9c780b96236c
//https://flaviocopes.com/how-to-format-date-javascript/
//https://medium.com/@zeolearn/6-best-reactjs-based-ui-frameworks-9c780b96236c      
//https://material.io/
//https://www.npmjs.com/package/react-super-responsive-table
//https://www.pluralsight.com/guides/how-to-use-static-html-with-react

### Using Regex to Find Text
Find many ocurrencies: 
Regex Pattern: \[\d{2}m \[\d{1}m \[\?\d{2}l [32;40  [K[?25h = \[[^abc]\[\?\d{2}h [32;40m 3ms[K
