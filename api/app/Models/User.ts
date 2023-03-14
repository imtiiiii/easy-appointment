import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
    column,
    beforeSave,
    BaseModel,
    hasMany,
    HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import TimeSlot from './TimeSlot'
import Appointment from './Appointment'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public first_name: string;

  @column()
  public last_name: string;

  @column()
  public email: string;

  @column({ serializeAs: null})
  public password: string;

  @column()
  public user_type: string;

  @column()
  public student_id: number;

  @column()
  public dept: string;

  @column()
  public course: string;

  @column()
  public status: number;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime;
  // * extras data
  @column()
  public total_users: number;
  @column()
    public total_students: number;
    @column()
    public total_teachers: number;
    @column()
    public total_pending_requests: number;

  /**
   *  Hooks
   */
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  /**
   * Database Relationships
   */

  @hasMany(() => TimeSlot, {
    foreignKey: "teacherId",
  })
  public teachersTimeSlots: HasMany<typeof TimeSlot>;

  @hasMany(() => TimeSlot, {
    foreignKey: "studentId",
  })
  public studentsTimeSlots: HasMany<typeof TimeSlot>;

  @hasMany(() => Appointment, {
    localKey: "studentId",
    foreignKey: "id",
  })
  public studentAppointment: HasMany<typeof Appointment>;
}
