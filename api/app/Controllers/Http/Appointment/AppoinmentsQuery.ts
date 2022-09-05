import Appointment from "App/Models/Appointment";
import moment from "moment";
import { DateTime } from "luxon";

export default class AppoinmentQuery {
  public async upCommingAppoinments(teacherId) {
    const appointmentRequest = await Appointment.query()
      .where("teacher_id", teacherId)
      .where("date", ">=", DateTime.local().toSQLDate())
      .where("status", "!=", `${1}`)
      .preload("forWhichTimeSlot", (q) =>
        q.select("start_time", "end_time", "day_no_id").preload("day").first()
      )
      .preload("byWhichStudent");
    return appointmentRequest;
  }

  public async toggleStatusQuery(payload) {
    const appointment = await Appointment.find(payload.appointment_id);

    if (appointment) {
      appointment.status = payload.status;
      appointment.save();
    }

    return appointment;
  }
  public async bookingReqQuery(payload) {
    console.log(payload);
    const data = {
      time_slot_id: payload.time_slot_id,
      student_id: payload.student_id,
      agenda: payload.agenda,
      date: payload.date,
      teacher_id: payload.teacher_id,
    };
    try {
      const save = await Appointment.create(data);
      return {
        msg: "request sent",
      };
    } catch (error) {
      console.log("errror is ", error);
    }
  }
  public async acceptedAppointmentsQuery(teacher_id) {
    const appointments = await Appointment.query()
      .where("teacher_id", teacher_id)
      .where("status", `${1}`)
      .preload("byWhichStudent")
      .preload("forWhichTimeSlot", (q) => q.preload("day"));
    return appointments;
  }
  async seeAppointmentsQuery(payload) {
    let appointments = Appointment.query().where("student_id", `${payload.id}`);
    if (payload.type === "history") {
      appointments.where("date", "<=", DateTime.local().toSQLDate());
    } else if (payload.type === "upcoming") {
      appointments
        .where("date", ">=", DateTime.local().toSQLDate())
        .andWhere("status", `${1}`);
    }
    appointments.preload("forWhichTimeSlot", (q) => q.preload("day"));
    appointments.preload("byWhichTeacher");
    return await appointments;
  }
}
