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
  private appointmentQuery: AppoinmentQuery;

  constructor() {
    this.appointmentQuery = new AppoinmentQuery();
  }
  public async upComingAppointmentsService(payload:{teacher_id:number}) {
    

    return this.appointmentQuery.upComingAppointmentRequests(payload);
  }

  public async toggleStatusService(payload :{request_id:number,status:string}  ) {
    return await this.appointmentQuery.toggleStatusQuery({appointment_id:payload.request_id,status:payload.status});
  }
  public async bookingReqService(payload: BookingReq) {
    //check if the student already requested for the same time
    const alreadyRequested = await this.appointmentQuery.checkBookingQuery({
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
   

    return await this.appointmentQuery.bookingReqQuery({
      time_slot_id: payload.time_slot_id,
      agenda: payload.agenda,
      teacher_id: payload.teacher_id,
      student_id: payload.student_id,
      date: payload.date.toFormat("yyyy-MM-dd"),
      status: '0',
    });
  }
  public async acceptedAppointmentsService(teacherId:number) {
    return await this.appointmentQuery.acceptedAppointmentsQuery(teacherId);
  }
  async seeAppointmentsService(payload) {
    return await this.appointmentQuery.seeAppointmentsQuery(payload);
  }
  async studentAppointmentHistoryService(payload:{studentId:number}){
    console.log("🚀 ~ file: AppoinmentsService.ts:62 ~ payload:", payload)
    
    return await this.appointmentQuery.studentsAppointmentHistoryQuery({student_id:payload.studentId})
  }
}
