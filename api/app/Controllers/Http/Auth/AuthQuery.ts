import User from '../../../Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import { Response } from '@adonisjs/core/build/standalone';

export default class AuthQuery {

  searchUsername(userName) {
    return Database.from('users').where('user_name', 'like', `${userName}%`).count('* as total')
  }

  async register(data) {
    return  await User.create(data);
    

  }

  updateUser(column, value, data) {
    return User.query().where(column, value).update(data)
  }

  singleUserToken(column, value, token) {
    return User.query().where(column, value).where('forgot_code', token).first()
  }
  getSingleUserInfo(column, value) {
    return User.query().where(column, value).first()
  }
  updateOnline(uid, isOnline) {
    return User.query().where('id', uid).update({ is_online: isOnline })
  }
}
