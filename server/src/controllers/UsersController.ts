import { Request, Response } from 'express';
import knex from "../database/connection";

class UsersController {
    async index(request: Request, response: Response) {
        
        const users = await knex('Users');
        return response.json({
            users: users
        });
    }

    async userTSql(request: Request, response: Response) {
        
        const users = await knex.raw("dbo.SP_Render_HTML_Table 'dbo.Users'");
        return response.json({
            users: users
        });
    }    
}

export default UsersController;