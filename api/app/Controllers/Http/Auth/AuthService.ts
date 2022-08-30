
import AuthQuery from './AuthQuery';
import Mail from '@ioc:Adonis/Addons/Mail';
import User from '../../../Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AuthService {
    private authQuery: AuthQuery
    constructor() {
        this.authQuery = new AuthQuery
    }

    public async register(ctx: HttpContextContract) {
        let data = ctx.request.all();
        delete data.password_confirmation
        /**
         * Enum values for data.status
         * '0' -> pending // Default Value
         * '1' -> active
         * '2' -> rejected
         */
        data.status = 0
        return await this.authQuery.register(data)
    }
   

  

   


    




};
