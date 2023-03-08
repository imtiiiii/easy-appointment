import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

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
    if (!ctx.auth.user) {
      return ctx.response.status(401).send("Unauthorized");
    }
    try {
      const payload = await this.appoinmentValidator.validateBookingReq(ctx);
      return await this.appoinmentService.bookingReqService({
        ...payload,
        student_id: ctx.auth.user?.$attributes.id,
      });
    } catch (error) {
      console.log("🚀 ~ file: Appointmentscontroller.ts:28 ~ error:", error)
      if (error.code === "E_VALIDATION_FAILURE") {
        
        return ctx.response
          .status(error.status)
          .send(error.messages.errors[0].message);
      } else if (error.code === "E_BAD_REQUEST") {
        return ctx.response.status(error.status).send(error.message);
      } else {
        return ctx.response.status(500).send("Internal Server Error");
      }
    }
  }

  async appointments(ctx: HttpContextContract) {
    try {
      const payload = await this.appoinmentValidator.validateSeeAppointments(
        ctx
      );
      payload.id = ctx.auth.user?.$attributes.id;
      return await this.appoinmentService.seeAppointmentsService(payload);
    } catch (error) {}
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
      return this.appoinmentService.acceptedAppointmentsService(teacher_id);
    } catch (error) {}
  }
}
