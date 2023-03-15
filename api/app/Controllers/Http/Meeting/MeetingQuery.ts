import User from "../../../Models/User";
import MeetingRoom from "../../../Models/MeetingRoom";
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
}
