import { DateTime } from "luxon";
import AppoinmentQuery from "./AppoinmentsQuery";
import { Exception } from "@adonisjs/core/build/standalone";
type BookingReq = {
  time_slot_id: number;
  agenda: string;
  teacher_id: number;
  date: DateTime;
  start_time: DateTime;
  end_time: DateTime;
  student_id: number;
};

export default class AppoinmentService {
  private appoinmentQuery: AppoinmentQuery;

  constructor() {
    this.appoinmentQuery = new AppoinmentQuery();
  }
  public async upCommingAppoinments(ctx) {
    const teacher_id = ctx.auth.user.id;

    return this.appoinmentQuery.upCommingAppoinments(teacher_id);
  }

  public async toggleStatusService(payload) {
    return await this.appoinmentQuery.toggleStatusQuery(payload);
  }
  public async bookingReqService(payload: BookingReq) {
    //check if the student already requested for the same time
    const x = payload.date.toFormat("yyyy-MM-dd");
    const alreadyRequested = await this.appoinmentQuery.checkBookingQuery({
      date: payload.date.toFormat("yyyy-MM-dd"),
      time_slot_id: payload.time_slot_id,
      student_id: payload.student_id,
    });
    if (alreadyRequested) {
      throw new Exception(
        "You already requested for this time slot",
        400,
        "E_BAD_REQUEST"
      );
    }
    // console.log(payload.date)
   

    return await this.appoinmentQuery.bookingReqQuery({
      time_slot_id: payload.time_slot_id,
      agenda: payload.agenda,
      teacher_id: payload.teacher_id,
      student_id: payload.student_id,
      date: payload.date.toFormat("yyyy-MM-dd"),
      status: '0',
    });
  }
  public async acceptedAppointmentsService(teacher_id) {
    return await this.appoinmentQuery.acceptedAppointmentsQuery(teacher_id);
  }
  async seeAppointmentsService(payload) {
    return await this.appoinmentQuery.seeAppointmentsQuery(payload);
  }
}
