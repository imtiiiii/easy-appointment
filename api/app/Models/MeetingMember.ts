import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import MeetingRoom from "./MeetingRoom";
import User from "./User";

export default class MeetingMember extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @column()
  public meeting_id: number;
  @column()
  public user_id: number;
  @column()
  public total_meetings: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
  @belongsTo(() => MeetingRoom, {
    localKey: "id",
    foreignKey: "meeting_id",
  })
  public meeting: BelongsTo<typeof MeetingRoom>;
  @belongsTo(() => User, {
    localKey: "id",
    foreignKey: "user_id",
  })
  public meeting_member: BelongsTo<typeof User>;
}
