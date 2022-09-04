import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import ProfileService from "./ProfileService";
import ProfileValidator from "./ProfileValidatior";

export default class ProfileController {
  private profileService: ProfileService;
  private profileValidator: ProfileValidator;

  constructor() {
    this.profileService = new ProfileService();
    this.profileValidator = new ProfileValidator();
  }

  async getProfileDetails(ctx: HttpContextContract) {
    const userId = ctx.request.params().id;
    let userInfo = await User.query().where("id", userId).first();
    if (userInfo) {
      return ctx.response.send(userInfo);
    }

    return ctx.response.status(422);
  }

  async updateProfile(ctx: HttpContextContract) {
    const userId = ctx.auth.user?.$attributes.id;
    const payload = ctx.request.all();
    try {
      return await this.profileService.updateProfileService(userId, payload);
    } catch (error) {
      return error;
    }
  }
}
