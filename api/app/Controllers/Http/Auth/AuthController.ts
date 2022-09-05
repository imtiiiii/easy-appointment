import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import AuthService from "./AuthService";
import AuthValidator from "./AuthValidator";

export default class AuthController {
  private authService: AuthService;
  private authValidator: AuthValidator;

  constructor() {
    this.authService = new AuthService();
    this.authValidator = new AuthValidator();
  }

  async register(ctx: HttpContextContract) {
    try {
      await this.authValidator.validateSignupSchema(ctx);
    } catch (error) {
      const errorObject = JSON.parse(error);
      // console.log(errorObject);
      return ctx.response.status(422).send({
        status: "BAD",
        message: errorObject,
        result: [],
      });
    }

    return this.authService.register(ctx);
  }

  async getUser(ctx: HttpContextContract) {
    console.log("get user called");
    try {
      if (ctx.auth.isLoggedIn) {
        return await ctx.auth.use("web").authenticate();
      }
    } catch (error) {
      return ctx.response.status(403).send({
        error,
      });
    }
  }
  /**
   * Only Logged In User Can access this Route
   */
  async logout(ctx: HttpContextContract) {
    // return auth.logout()
    await ctx.auth.use('web').logout();
    return ctx.response.status(200).send({
      status: "OK",
      message: "User is logged out successfully!!",
      result: [],
    });
  }
  async login(ctx: HttpContextContract) {
    const data = ctx.request.all();

    try {
      const logininfo = await ctx.auth
        .use("web")
        .attempt(data.email, data.password);
      console.log("login info", logininfo);
      return logininfo;
    } catch (error) {
      return ctx.response.status(422);
    }
  }

  async delete(ctx: HttpContextContract) {
    const data = ctx.request.all();
    const user = await User.findOrFail(data.id);
    user.delete();
  }
}
