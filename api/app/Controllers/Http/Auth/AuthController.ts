import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import AuthService from "./AuthService";
import AuthValidator from "./AuthValidator";
import nodemailer from "nodemailer";
import Env from "@ioc:Adonis/Core/Env";

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

    return await this.authService.register(ctx);
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
    await ctx.auth.use("web").logout();
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
  async getUserList(ctx: HttpContextContract) {
    const str = ctx.request.qs().search;
    const query = User.query()

      .where("status", "1")
      .where("user_type", "!=", "admin");

    if (str) {
      query
        .where("first_name", "like", `%${str}%`)
        .orWhere("last_name", "like", `%${str}%`)
        .orWhere("email", "like", `%${str}%`);
    }
    query.select(
      "id",
      "first_name",
      "last_name",
      "email",
      "user_type",
      "status"
    );
    return await query.limit(2);
  }
  async testEmail(ctx: HttpContextContract) {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: Env.get("SMTP_USERNAME"),
        pass: Env.get("SMTP_PASSWORD"),
      },
    });
    let info = await transporter.sendMail({
      from: '"Easy Appointment" <easyappointment@gmail.com>', // sender address
      to: "imtiazahmed026.work@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Thank you for your support", // plain text body
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>New Signup Request</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
          }
          table {
            border-collapse: collapse;
            margin: 20px 0;
          }
          th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ccc;
          }
          th {
            background-color: #eee;
          }
        </style>
      </head>
      <body>
        <h1>New Signup Request</h1>
        <p>A new user has signed up and is awaiting approval. The following are the details:</p>
        <table>
          <tr>
            <th>Full Name</th>
            <td>[Full name of the user]</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>[Email address of the user]</td>
          </tr>
          <tr>
            <th>Company</th>
            <td>[Name of the user's company (if applicable)]</td>
          </tr>
          </table>
          </body>
      

      `,

    });
    console.log("Message sent: %s", info);
  }
}
