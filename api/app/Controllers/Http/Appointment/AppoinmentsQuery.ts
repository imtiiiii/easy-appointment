import Appointment from "App/Models/Appointment";

import { DateTime } from "luxon";

type CheckBooking = {
  time_slot_id: number;
  student_id?: number;
  date: string;
  status?: string;
};
type BookingReq = {
  time_slot_id: number;
  agenda: string;
  teacher_id: number;
  student_id: number;
  date: string;
  status: "0";
};

export default class AppoinmentQuery {
  public async upComingAppointments({ teacher_id }: { teacher_id: number }) {
    const appointmentRequest = await Appointment.query()
      .where("teacher_id", teacher_id)
      .where("date", ">=", DateTime.local().toSQLDate())
      .where("status", "!=", `${1}`)
      .preload("forWhichTimeSlot", (q) =>
        q.select("start_time", "end_time", "day_no_id").preload("day")
      )
      .preload("byWhichStudent");
    return appointmentRequest;
  }
  public async upComingAppointmentRequests({
    teacher_id,
  }: {
    teacher_id: number;
  }) {
    const appointmentRequest = await Appointment.query()
      .where("teacher_id", teacher_id)
      .where("date", ">=", DateTime.local().toSQLDate())
      .where("status", "=", "0")
      .preload("forWhichTimeSlot", (q) =>
        q
          .select("start_time", "end_time", "day_no_id")
          .preload("day", (q) => q.select("id", "day_name"))
      )
      .preload("byWhichStudent", (student) =>
        student.select("id", "first_name", "last_name", "email", "dept")
      );
    return appointmentRequest;
  }

  public async toggleStatusQuery(payload :{appointment_id:number,status:string}   ) {
    const appointment = await Appointment.find(payload.appointment_id);  

    if (appointment) {
      return await appointment.merge({ status: payload.status }).save();
    }

    return appointment;
  }
  public async bookingReqQuery(payload: BookingReq) {
    return await Appointment.create(payload);
  }
  public async acceptedAppointmentsQuery(teacher_id :number) {
    const appointments = await Appointment.query()
      .where("teacher_id", teacher_id)
      .where("status", "1")
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
  async studentsAppointmentHistoryQuery(payload:{student_id:number}) {
    let appointments = Appointment.query().where("student_id", `${payload.student_id}`)
    .where('status','1')
    .orWhere('status','0');
    appointments.preload("forWhichTimeSlot", (q) => q.preload("day"))
    appointments.preload("byWhichTeacher");
    return await appointments;
  }
  async checkBookingQuery(fields: CheckBooking) {
    return await Appointment.query().where(fields).first();
  }
}
