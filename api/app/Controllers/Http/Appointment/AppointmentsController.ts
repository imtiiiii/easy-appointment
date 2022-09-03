import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Appointment from "../../../Models/Appointment";
import moment from "moment";
moment().format();

import AppointmentsValidator from "./AppoinmentsValidator";
import AppoinmentsService from "./AppoinmentsService";
// import TimeSlot from 'App/Models/TimeSlot';

export default class AppointmentsController {
  private appoinmentValidator: AppointmentsValidator;
  private appoinmentService: AppoinmentsService;

  constructor() {
    this.appoinmentValidator = new AppointmentsValidator();
    this.appoinmentService = new AppoinmentsService();
  }
  async request(ctx: HttpContextContract) {
    try {
      const payload = await this.appoinmentValidator.validateBookingReq(ctx);
      const validateOverLapping = await this.appoinmentValidator.checkBooking({
        ...payload,
        student_id: ctx.auth.user?.$attributes.id,
      });
        
      if (validateOverLapping.validated) {
          return await this.appoinmentService.bookingReqService({...payload,student_id:ctx.auth.user?.$attributes.id});
      } else return ctx.response.status(500).send(validateOverLapping.msg);
    } catch (error) {}
  }

  async appointments(ctx: HttpContextContract) {
    const data = ctx.request.all();
    // console.log(data)
    // const currdate = moment();

    const appointment = await Appointment.query()
      .where("studentId", data.id)
      .andWhere("status", "1")
      .preload("forWhichTimeSlot", (slotQuery) => {
        slotQuery.preload("user");
      });
    console.log(appointment.length);
    return appointment;
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
        status: "BAD",
        message: errorObj,
        result: [],
      });
    }
    return await this.appoinmentService.status(ctx);
  }
  public async accepted(ctx: HttpContextContract) {
    const data = ctx.request.qs();
    console.log(data);
    const appointments = await Appointment.query()
      .where("teacher_id", data.id)
      .andWhere("status", "1")
      .preload("byWhichStudent")
      .preload("forWhichTimeSlot");
    return appointments;
  }
}
