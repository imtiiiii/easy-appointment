import { schema, rules, validator } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Appointment from '../../../Models/Appointment';

export default class AppointmentValidator {
    public async status(ctx: HttpContextContract) {
        const statusIdSchema = schema.create({
            appointmentId: schema.number(),
            status: schema.string({ trim: true })
        });
        const validationMessage = {
            required: 'The {{ field }} is required to create a new account',
            'appointmentId.number': "appointmentId must be a valid number",
            'status.string': "appointmentId must be a valid number on string format.Ex: Valid Range ['0','1','2']",
        }
        try {
            const payload = await ctx.request.validate({ schema: statusIdSchema, messages: validationMessage });
            return payload;
        } catch (error) {
            const errorString = JSON.stringify(error.messages);
            throw errorString
        }
    }
    public async validateBookingReq(ctx: HttpContextContract) {


        const bookingReq = schema.create({
            timeSlotId: schema.number(),
            studentId: schema.number([rules.exists({ table: "users", column: "id" })]),
            agenda: schema.string(),
            teacherId: schema.number([rules.exists({ table: "users", column: "id" })]),
            date: schema.string()
        })
        const msg = {
            required: 'The {{ field }} is required but it is missing',
            "teacherId.exists": "Teacher not found",
            "studentId.exists": "Student not found",

        }

        try {
            const payload = await ctx.request.validate({ schema: bookingReq, messages: msg })

            return payload
        } catch (error) {
            return error.message

        }
    }
    public async checkBooking(data) {
        const isAlreadyBooked: any = await Appointment.query().where("timeSlotId", data.timeSlotId).andWhere("date", data.date).andWhere("status", '=', `${1}`);
        console.log(isAlreadyBooked);

        if ((isAlreadyBooked.length)) {
            return ({ msg: "This slot is already booked", validated: false })
        }
        const check: any = await Appointment.query().where("studentId", data.studentId).andWhere("timeSlotId", data.timeSlotId)
            .andWhere("date", "=", data.date)

        if ((check.length)) {
            return ({ msg: "Be paitent! You already requested for that slot once ", validated: false })
        }
        return ({ msg: "", validated: true })
    }
}