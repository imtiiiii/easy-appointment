import User from "../../../Models/User";
import MeetingRoom from "../../../Models/MeetingRoom";
import MeetingMember from "App/Models/MeetingMember";
export default class MeetingQuery {
  public async getUserByLimit(limit: number): Promise<User[]> {
    const user = User.query().limit(limit);
    return user;
  }
  public async createMeetingQuery(payload: {
    agenda: string;
    link: string;
    description: string;
    datetime: string;
    host_id: number;
  }) {
    const meeting = await MeetingRoom.create(payload);
    return meeting;
  }
  async meetingListQuery({ userId }: { userId: number }) {
    return await MeetingMember.query()
      .where("user_id", userId)
      .preload("meeting", (q) => q.preload("host"))
      .select("meeting_id", "user_id")
      .distinct("meeting_id");
  }
  async countMeetingsQuery(userId:number){
    return await MeetingMember.query().where("user_id", userId).countDistinct("meeting_id as total_meetings").first()
  }
}
