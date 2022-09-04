import { DateInput, DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";

import Day from "./Day";
import Appointment from "../Models/Appointment";

export default class TimeSlot extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @column()
  public teacher_id: number;

  @column()
  public day_no_id: number;

  @column()
  public start_time: DateTime;

  @column()
  public end_time: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Database Relationships
   */
  @belongsTo(() => User, {
    localKey: "id",
  })
  public byTeacher: BelongsTo<typeof User>;

  // @belongsTo(()=> User,{
  //   localKey:'id'
  // })
  // public byStudent : BelongsTo<typeof User>
  @belongsTo(() => User, {
    foreignKey: "teacherId",
  })
  public user: BelongsTo<typeof User>;
  @belongsTo(() => Day, {
    foreignKey:"day_no_id"
  })
  public day: BelongsTo<typeof Day>;

  @hasMany(() => Appointment, {
    foreignKey: "time_slot_id",
  })
  public teacherAppointments: HasMany<typeof Appointment>;
}
