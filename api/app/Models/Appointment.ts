import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import TimeSlot from "./TimeSlot";

export default class Appointment extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public time_slot_id: number;
  @column()
  public teacher_id: number;

  @column()
  public student_id: number;

  @column()
  public status: string;

  /**
   * This Column act like note of appoinment request
   */
  @column()
  public agenda: string;
  @column()
  public date: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  // * extras
  @column()
  public all_appointments_count: number;
  @column()
  public pending_appointments_count: number;
  @column()
  public todays_appointments_count: number;
  @column()
  public up_coming_appointments_count: number;

  /**
   * Database Relationships
   */
  @belongsTo(() => User, {
    localKey: "id",
    foreignKey: "student_id",
  })
  public byWhichStudent: BelongsTo<typeof User>;

  @belongsTo(() => User, {
    localKey: "id",
    foreignKey: "teacher_id",
  })
  public byWhichTeacher: BelongsTo<typeof User>;

  @belongsTo(() => TimeSlot, {
    localKey: "id",
    foreignKey: "time_slot_id",
  })
  public forWhichTimeSlot: BelongsTo<typeof TimeSlot>;
}
