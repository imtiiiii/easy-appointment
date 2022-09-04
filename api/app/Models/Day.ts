import { DateTime } from "luxon";
import { BaseModel, column, HasMany, hasMany } from "@ioc:Adonis/Lucid/Orm";
import TimeSlot from "./TimeSlot";

export default class Day extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @column({ isPrimary: true })
  public day_no: number;

  @column()
  public day_name: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /**
   * Database Relationships
   */
  @hasMany(() => TimeSlot, {
    foreignKey: "day_no_id",
  })
  public timeSlots: HasMany<typeof TimeSlot>;
}
