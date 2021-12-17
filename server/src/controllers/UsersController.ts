import { Request, Response } from 'express';
import knex from "../database/connection";

class UsersController {
    async index(request: Request, response: Response) {
        
        const users = await knex('Person.Person_EM');
        return response.json({
            users: users
        });
    }

    async userTSql(request: Request, response: Response) {
        const users = await knex.raw("dbo.SP_Render_HTML_Table 'Person.Person_EM'");
        return response.json({
            users: users
        });
    }
    
   async personReports(request: Request, response: Response) {
        const tblArray = ['Person.Person_EM', 'Person.PersonType_QTD', 'Sales.VW_SalesTerritory', 'Sales.SalesTerritory_Group'];

        const promises =  tblArray.map(async (res) => {
            return await knex.raw(`dbo.SP_Render_HTML_Table '${res}'`);
        });

        const results = await Promise.all(promises)
        
        return response.json({
            results
        });
   }
   
   async salesPersonType(request: Request, response: Response) {

        const { utype } = request.params;

        const personSales = await knex.raw(`Sales.PROC_PersonTypeSales @PersonType = '${utype}'`);
       
        return response.json({
            personSales
        });
   }   
   

}

export default UsersController;