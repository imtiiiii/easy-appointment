import { schema, rules, validator } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Appointment from "../../../Models/Appointment";

export default class AppointmentValidator {
  public async validateToggleStatus(ctx: HttpContextContract) {
    const statusIdSchema = schema.create({
      request_id: schema.number([
        rules.exists({
          table: "appointments",
          column: "id",
          where: { teacher_id: ctx.auth.user?.id },
        }),
      ]),
      status: schema.enum(["0", "1", "2"]),
    });
    const validationMessage = {
      required: "The {{ field }} is required",
      "request_id.number": "appointmentId must be a valid number",
      "request_id.exists": "appointmentId not found",
      "status.string":
        "appointmentId must be a valid number on string format.Ex: Valid Range ['0','1','2']",
    };

    const payload = await ctx.request.validate({
      schema: statusIdSchema,
      messages: validationMessage,
    });
    return payload;
  }
  public async validateBookingReq(ctx: HttpContextContract) {
    const bookingReq = schema.create({
      time_slot_id: schema.number([
        rules.exists({ table: "time_slots", column: "id" }),
      ]),

      agenda: schema.string(),
      teacher_id: schema.number([
        rules.exists({ table: "users", column: "id" }),
      ]),
      date: schema.date({ format: "yyyy-MM-dd" }, [
        rules.unique({
          table: "appointments",
          column: "date",
          where: {
            teacher_id: ctx.request.all().teacher_id,
            time_slot_id: ctx.request.all().time_slot_id,
            status: "1",
          },
        }),
      ]),
      start_time: schema.date({ format: "HH:mm:ss" }, [
        rules.exists({
          table: "time_slots",
          column: "start_time",
          where: {
            id: ctx.request.all().time_slot_id,
            teacher_id: ctx.request.all().teacher_id,
          },
        }),
      ]),
      end_time: schema.date({ format: "HH:mm:ss" }, [
        rules.exists({
          table: "time_slots",
          column: "end_time",
          where: {
            id: ctx.request.all().time_slot_id,
            teacher_id: ctx.request.all().teacher_id,
          },
        }),
      ]),
    });
    const msg = {
      required: "The {{ field }} is required but it is missing",
      exists: "{{field}} not found",
      "end_time.date.format": "unexpected format of end time",
      "start_time.date.format": "unexpected format of end time",
      "date.date.format": "unexpected format of date",
      "date.unique": "This slot is already booked",
    };

    const payload = await ctx.request.validate({
      schema: bookingReq,
      messages: msg,
    });

    return payload;
  }
  public async checkBooking(data) {
    const isAlreadyBooked: any = await Appointment.query()
      .where("time_slot_id", data.time_slot_id)
      .andWhere("date", data.date)
      .andWhere("status", "=", `${1}`);

    if (isAlreadyBooked.length) {
      return { msg: "This slot is already booked", validated: false };
    }
    const check: any = await Appointment.query()
      .where("student_id", data.student_id)
      .andWhere("time_slot_id", data.time_slot_id)
      .andWhere("date", "=", data.date);
    if (check.length) {
      return {
        msg: "Be paitent! You already requested for that slot once ",
        validated: false,
      };
    }
    return { msg: "", validated: true };
  }
  async validateSeeAppointments(ctx: HttpContextContract) {
    const slug = schema.create({
      id: schema.number(),
      type: schema.string(),
    });
    const validationMessage = {
      required: "The {{ field }} is missing",
    };
    return ctx.request.validate({ schema: slug, messages: validationMessage });
  }
}
