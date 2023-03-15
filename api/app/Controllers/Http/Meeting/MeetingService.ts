import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import MeetingQuery from "./MeetingQuery";
import { DateTime } from "luxon";
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
      invitees: number[];
    }
  ) {
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
        return {
          meeting_id: meeting.id,
          user_id: invitee,
        };
      })
    );
    await meeting.related("meetingMembers").createMany(meetingMembers);
    return meeting;
  }
  async getMeetingListService({ userId }: { userId: number }) {
    return await this.meetingQuery.meetingListQuery({ userId: userId });
  }
    async singleMeetingInfoService(payload: { meetingId: number }) {
    return await this.meetingQuery.singleMeetingInfoQuery(payload);
    }
}
