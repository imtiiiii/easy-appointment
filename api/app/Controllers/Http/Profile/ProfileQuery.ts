import User from "App/Models/User"

export default class ProfileQuery {
  async updateProfileQuery(userId,payload) {
   
    const user = await User.query().where('id', userId).update(payload);

    
   
      return user;
  }
}