import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Appointment from "../../../Models/Appointment";
import moment from "moment";
moment().format();

import AppointmentsValidator from "./AppoinmentsValidator";
import AppoinmentsService from "./AppoinmentsService";


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
        return await this.appoinmentService.bookingReqService({
          ...payload,
          student_id: ctx.auth.user?.$attributes.id,
        });
      } else return ctx.response.status(500).send(validateOverLapping.msg);
    } catch (error) {}
  }

  async appointments(ctx: HttpContextContract) {
    
    try {
      const payload = await this.appoinmentValidator.validateSeeAppointments(ctx)
      payload.id = ctx.auth.user?.$attributes.id;
      return await this.appoinmentService.seeAppointmentsService(payload)
    } catch (error) {
      
    }
   
    

    
  }
  public async upComingAppoinments(ctx: HttpContextContract) {
    return await this.appoinmentService.upCommingAppoinments(ctx);
  }

  public async toggleStatus(ctx: HttpContextContract) {
    try {
      const payload = await this.appoinmentValidator.validateToggleStatus(ctx);
      return await this.appoinmentService.toggleStatusService(payload);
    } catch (error) {
      return ctx.response.status(422).send(error);
    }
  }

  public async accepted(ctx: HttpContextContract) {
    const teacher_id = ctx.auth.user?.$attributes.id;
    try {
      return this.appoinmentService.acceptedAppointmentsService(teacher_id)
    } catch (error) {
      
    }
    
   
  }
}
