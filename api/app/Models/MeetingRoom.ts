import { DateTime } from "luxon";
import {
  BaseModel,
  HasMany,
  HasOne,
  column,
  hasMany,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import MeetingMember from "./MeetingMember";
import User from "./User";

export default class MeetingRoom extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @column()
  public agenda: string;
  @column()
  public link: string;
  @column()
  public description: string;
  @column()
  public datetime: string;
  @column()
  public host_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => MeetingMember, {
    foreignKey: "meeting_id",
  })
  public meetingMembers: HasMany<typeof MeetingMember>;
  @hasOne(() => User, {
    foreignKey: "id",
    localKey: "host_id",
  })
  public host: HasOne<typeof User>;
}
