import Appointment from "App/Models/Appointment";
import moment from "moment";
import { DateTime } from 'luxon';

export default class AppoinmentQuery {
  public async upCommingAppoinments(teacherId) {
   
    const appointmentRequest = await Appointment.query().where('teacher_id', teacherId)
      .where('date', '>=', DateTime.local().toSQLDate())
      .where("status", '!=', `${1}`)
      .preload("forWhichTimeSlot", (q) => q.select('start_time', 'end_time', 'day_no_id').preload("day").first())
    .preload('byWhichStudent')
    return appointmentRequest;

    
  }

  public async status(changeStatusFor) {
    let appointment = await Appointment.findOrFail(
      changeStatusFor.appointmentId
    );
    appointment.status = changeStatusFor.status;

    await appointment.save();
  }
  public async bookingReqQuery(payload) {
    console.log(payload)
    const data = {
      time_slot_id: payload.time_slot_id,
      student_id: payload.student_id,
      agenda: payload.agenda,
      date: payload.date,
      teacher_id:payload.teacher_id
    };
    try {
      const save = await Appointment.create(data);
    } catch (error) {
      console.log("errror is ", error)
      
    }
  }
}
