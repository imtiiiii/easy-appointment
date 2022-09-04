import User from "App/Models/User"

export default class ProfileQuery {
  async updateProfileQuery(userId,payload) {
   
    const user = await User.find(userId)
    user?.merge(payload).save()
   
      return user;
  }
}