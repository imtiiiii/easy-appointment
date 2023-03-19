import AuthQuery from "./AuthQuery";

import User from "../../../Models/User";

import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import nodemailer from "nodemailer";
import Env from "@ioc:Adonis/Core/Env";

export default class AuthService {
  private authQuery: AuthQuery;
  constructor() {
    this.authQuery = new AuthQuery();
  }

  public async register(ctx: HttpContextContract) {
    let data = ctx.request.all();
    delete data.password_confirmation;

   

    data.status = "0";
    const newUser = await this.authQuery.register(data);
    await this.newSignupNotificationToAdmin(newUser);
    return newUser;
  }
  async newSignupNotificationToAdmin(newUser: User) {
   
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: Env.get("SMTP_USERNAME"),
        pass: Env.get("SMTP_PASSWORD"),
      },
    });
    let info = await transporter.sendMail({
      from: '"Easy Appointment" <easyappointment@gmail.com>', // sender address
      to:"imtiazahmed026.work@gmail.com", // list of receivers
      subject: "New signup request", // Subject line
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
            <td>${newUser.first_name + " " + newUser.last_name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>${newUser.email}</td>
          </tr>
          <tr>
            <th>User type</th>
            <td>${newUser.user_type}</td>
          </tr>
          </table>
          <a href="http://localhost:3000/admin/join-requests">view pending signup requests</a>
          </body>
            </html>
      `,
    });
    console.log("Message sent: %s", info);
  }
}
