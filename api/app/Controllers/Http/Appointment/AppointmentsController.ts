import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Appointment from '../../../Models/Appointment'
import moment from 'moment';
moment().format()

import AppointmentsValidator from './AppoinmentsValidator';
import AppoinmentsService from './AppoinmentsService';
import TimeSlot from 'App/Models/TimeSlot';

export default class AppointmentsController {
    private appoinmentValidator: AppointmentsValidator
    private appoinmentService: AppoinmentsService

    constructor() {
        this.appoinmentValidator = new AppointmentsValidator()
        this.appoinmentService = new AppoinmentsService()

    }
    async request(ctx: HttpContextContract) {
        const data = ctx.request.all().data;
        console.log("data request = ", data)
        const check = await Appointment.query().where("studentId", data.studentId).andWhere("teacherId", data.teacherId)
            .andWhere("date", "=", data.date).andWhere("start_time", data.startTime).andWhere("end_time", data.endTime)
        console.log(check.length);
        if (check.length === 0) {

            const reqSent = await Appointment.create(data);
            return {
                reqSent,
                msg: "request sent"
            }
        }
        else {
            return {
                msg: "Be paitent! You already requested for that slot once "
            }
        }

    }
    async alreadyBooked(ctx: HttpContextContract) {
        const data = ctx.request.qs();
        data.teacher_id = parseInt(data.teacher_id)
        console.log("date hobe ", data.endTime)


        const check = await Appointment.query().where("date", '=', data.endTime).andWhere("status", "1").andWhere("teacher_id", data.teacher_id)
        return check.length
    }
    async appointments(ctx: HttpContextContract) {
        const data = ctx.request.all();
        // console.log(data)
        // const currdate = moment();

        const appointment = await Appointment.query().where("studentId", data.id).andWhere("status", "1").preload("forWhichTimeSlot", (slotQuery) => {
            slotQuery.preload("user")
        });
        console.log(appointment.length)
        return appointment
    }
    public async upCommingAppoinments(ctx: HttpContextContract) {
        return await this.appoinmentService.upCommingAppoinments(ctx);
    }
    /**
     * Status Controller
     * Ex Put Body: 
     *  
     * {
            "appointmentId":"lll"
        }
     */
    public async status(ctx: HttpContextContract) {
        try {
            await this.appoinmentValidator.status(ctx);
        } catch (error) {
            const errorObj = JSON.parse(error);
            return ctx.response.status(422).send({
                status: 'BAD',
                message: errorObj,
                result: []
            });
        }
        return await this.appoinmentService.status(ctx);
    }
    public async accepted(ctx: HttpContextContract) {
        const data = ctx.request.qs()
        console.log(data)
        const appointments = await Appointment.query().where("teacher_id", data.id).andWhere("status", "1").preload("byWhichStudent").preload("forWhichTimeSlot")
        return appointments
    }
}
