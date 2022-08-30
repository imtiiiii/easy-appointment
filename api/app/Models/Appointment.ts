import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, scope } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import TimeSlot from './TimeSlot'
import moment from 'moment'

export default class Appointment extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public time_slot_id: number
    @column()
    public teacher_id: number

    @column()
    public student_id: number

    @column()
    public status: number

    /**
     * This Column act like note of appoinment request
     */
    @column()
    public agenda: string
    @column()
    public date: string
    @column()
   

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime


    /**
     * Database Relationships
     */
    @belongsTo(() => User, {
        localKey: 'id',
        foreignKey: 'studentId'
    })
    public byWhichStudent: BelongsTo<typeof User>


    @belongsTo(() => TimeSlot, {
        localKey: 'id'
    })
    public forWhichTimeSlot: BelongsTo<typeof TimeSlot>



}
