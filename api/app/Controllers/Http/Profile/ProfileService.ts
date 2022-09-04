import ProfileQuery from "./ProfileQuery";

export default class ProfileSevice {
  private profileQuery: ProfileQuery;
  constructor() {
    this.profileQuery = new ProfileQuery();
  }
  async updateProfileService(userId,payload) {
    
    return await this.profileQuery.updateProfileQuery(userId,payload);
  }
}