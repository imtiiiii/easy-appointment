import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TimeSlot from '../../../Models/TimeSlot'
import TimeSlotValidator from './TimeSlotValidator';
import TimeSlotService from './TimeSlotService';
import moment from 'moment';
import { DateTime } from 'luxon';
import Day from 'App/Models/Day';
moment().format();
// import User from 'App/Models/User';
export default class TimeSlotsController {
    private timeSlotValidator: TimeSlotValidator
    private timeSlotService: TimeSlotService

    constructor() {
        this.timeSlotService = new TimeSlotService()
        this.timeSlotValidator = new TimeSlotValidator()
    }
    public async add(ctx: HttpContextContract) {
        const data = ctx.request.all();

        const { day_id } = data;
        const { teacher_id } = data;
        let { start_time } = data;
        let { end_time } = data;
        start_time = moment(start_time).format("HH:mm")
        end_time = moment(end_time).format("HH:mm")
        console.log("start_time", start_time)
        console.log("end_time", end_time)
        const query = await TimeSlot.query().where("day_id", day_id).andWhere("start_time", start_time).orWhere("end_time", end_time)
        console.log(query);

        const newStartTime = moment(start_time, "DD-MM-YYYY HH:mm");
        const newEndTime = moment(end_time, "DD-MM-YYYY HH:mm")


        const teacher = await TimeSlot.query().where("teacherId", teacher_id).where("dayId", day_id).preload("user");
        for (let i of teacher) {
            const oldStartTime = moment(i.startTime, "DD-MM-YYYY HH:mm")
            const oldEndTime = moment(i.endTime, "DD-MM-YYYY HH:mm")
            if (newStartTime.isSame(oldStartTime)) {
                console.log("iam 1")
                return {
                    msg: "not possible"
                }
            }
            if (newStartTime.isAfter(oldStartTime)) {

                if (newStartTime.isBefore(oldEndTime)) {
                    console.log(" i am 2");
                    return {
                        msg: "not possible"
                    }
                }
            }
            // ******* END TIME VALIDATION ********
            if (newEndTime.isSame(oldStartTime) || newEndTime.isSame(oldEndTime)) {
                console.log(" i am 3")
                return {
                    msg: "not possible"
                }
            }
            if (newEndTime.isAfter(oldStartTime)) {
                if (newEndTime.isBefore(oldEndTime)) {
                    console.log(" i am 4")
                    return {
                        msg: "not possible"
                    }
                }
            }
            // ********** START AND END TIME BOTH **********
            // ********* WHEN NEW START TIME IS AVAILABLE BUT END TIME CONFLICT WITH OTHER TIME SLOT'S START OR END TIME  = NOT POSSIBLE *************
            if (newStartTime.isBefore(oldStartTime)) {
                if (newEndTime.isAfter(oldStartTime)) {
                    console.log(" i am 5")
                    return {
                        msg: "not possible"
                    }
                }
            }
            // ********** WHEN NEW START TIME MORE RECENT THAN OLD START TIMIE  **********
            // BUT NEW END TIME IS LESS RECENT THAN OLD END TIME . SO THE SLOT CONFLICTS=NOT POSSIBLE
            if (newStartTime.isAfter(oldStartTime) && newEndTime.isBefore(oldEndTime)) {
                console.log("im 6")
                return {
                    msg: "not possible"
                }
            }
        }
        data.startTime = newStartTime.format(" HH:mm").toString();
        data.endTime = newEndTime.format("HH:mm").toString();
        // const saveToDb = await TimeSlot.create(data);
        return {
            // saveToDb,
            msg: "possible"
        }
    }

    public async slots(ctx: HttpContextContract) {
        const { teacher_id, day_id, date } = ctx.request.qs();

        const slots = await TimeSlot.query().where("teacher_id", teacher_id).andWhere("day_id", day_id).whereDoesntHave("allAppointment", query => {
            query.where("status", "1")
                .andWhere("date", date)
        })
        return slots
    }

    //TODO: This Controller only accessable by teacher type user
    public async created(ctx: HttpContextContract) {
        try {
            const payload = await this.timeSlotValidator.created(ctx);
        } catch (error) {
            const errorObject = JSON.parse(error);
            return ctx.response.status(422).send({
                status: 'BAD',
                message: errorObject,
                result: []
            });
        }
        return await this.timeSlotService.created(ctx);
    }
    //TODO: This Controller only accessable by teacher type user
    public async available(ctx: HttpContextContract) {
        return this.timeSlotService.available(ctx);
    }

    //TODO: This controller only accessable by teacher
    public async update(ctx: HttpContextContract) {
        try {
            await this.timeSlotValidator.update(ctx)
        } catch (error) {
            const errorObj = JSON.parse(error);
            return ctx.response.status(422).send({
                status: 'BAD',
                message: errorObj,
                result: []
            });
        }
        return this.timeSlotService.update(ctx);
    }

    //TODO: This controller only accessable by teacher
    public async delete(ctx: HttpContextContract) {
        return this.timeSlotService.delete(ctx);
    }

}
