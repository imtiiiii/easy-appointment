import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import MeetingQuery from "./MeetingQuery";
import { DateTime } from "luxon";
import nodemailer from "nodemailer";
import Env from "@ioc:Adonis/Core/Env";
import MeetingRoom from "../../../Models/MeetingRoom";
export default class MeetingService {
  private meetingQuery: MeetingQuery;
  constructor() {
    this.meetingQuery = new MeetingQuery();
  }
  public async getMeetingByLimit(ctx: HttpContextContract) {
    const limit = ctx.request.all().limit;
    const user = await this.meetingQuery.getUserByLimit(limit);
    return user;
  }
  public async createMeetingService(
    userId: number,
    payload: {
      agenda: string;
      link: string;
      description: string;
      datetime: DateTime;
      invitees: {
        [key: string]: any;
      }[];
    }
  ) {
    console.log(payload, "paytload");

    let emails: any[] = [];
    const meetingPayload = {
      agenda: payload.agenda,
      link: payload.link,
      description: payload.description,
      datetime: payload.datetime.toFormat("yyyy-MM-dd HH:mm"),
      host_id: userId,
    };
    const meeting = await this.meetingQuery.createMeetingQuery(meetingPayload);
    const meetingMembers = await Promise.all(
      payload.invitees.map((invitee) => {
        emails.push(invitee.email);
        return {
          meeting_id: meeting.id,
          user_id: invitee.id,
        };
      })
    );
    meetingMembers.push({
      meeting_id: meeting.id,
      user_id: userId,
    });

    await meeting.related("meetingMembers").createMany(meetingMembers);

    // send email
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: Env.get("SMTP_USERNAME"),
        pass: Env.get("SMTP_PASSWORD"),
      },
    });
    let info = await transporter.sendMail({
      from: '"Easy Appointment" <easyappointment@gmail.com>', // sender address
      to: emails, // list of receivers
      subject: "You have added to a meeting room", // Subject line
      html: ` <h1>Meeting Room</h1>
        <p>Hi, you have been added to a meeting room. Please click the link below to join the meeting room.</p>
        <p>Meeting Room Link: ${payload.link}</p>
        <p>Meeting Room Agenda: ${payload.agenda}</p>
        <p>Meeting Room Description: ${payload.description}</p>
        <p>Meeting Room Date: ${payload.datetime.toFormat(
          "yyyy-MM-dd HH:mm"
        )}</p>
        `,
    });
    console.log("Message sent: %s", JSON.stringify(info));

    return meeting;
  }
  async getMeetingListService({ userId }: { userId: number }) {
    return await this.meetingQuery.meetingListQuery({ userId: userId });
  }
  async singleMeetingInfoService(payload: { meetingId: number }) {
    return await this.meetingQuery.singleMeetingInfoQuery(payload);
  }
  async getTodaysMeetingsService() {
    const temp = await MeetingRoom.query()
      .whereRaw("DATE(datetime) = CURDATE()")
      .select("id", "datetime", "link")
      .preload("meetingMembers", (q) =>
        q
          .groupBy("user_id")
          .preload("meeting_member", (q2) => q2.select("id", "email"))
      );
    const emails: any = [];
    if (temp.length > 0) {
      temp.forEach((item) => {
        item.meetingMembers.forEach((member) => {
          emails.push(member.meeting_member.email);
        });
      });
      const transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: Env.get("SMTP_USERNAME"),
          pass: Env.get("SMTP_PASSWORD"),
        },
      });
      // Reminder email
      let info = await transporter.sendMail({
        from: '"Easy Appointment" <easyappointment@gmail.com>', // sender address
        to: emails, // list of receivers
        subject: "Reminder !!!!!", // Subject line
        html: `
            <h1>Meeting Room</h1>
            <p> This is a reminder email for your meeting room.  </p>
            <p>Today you have a meeting room at ${temp[0].datetime}.</p>
            <p>Meeting Room Link: ${temp[0].link}</p>
        `,
      });
      console.log("Message sent: %s", JSON.stringify(info));
    }
  }
}
