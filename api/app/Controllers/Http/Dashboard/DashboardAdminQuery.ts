// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from "../../../Models/User";
import Appointment from "App/Models/Appointment";
export default class DashboardAdminQuery {
  public async allUsersCountQuery() {
    return await User.query().count("id as total_users").first();
  }
  public async teacherCountQuery() {
    return await User.query()
      .where("user_type", "teacher")
      .count("id as total_teachers")
      .first();
  }
  public async studentCountQuery() {
    return await User.query()
      .where("user_type", "student")
      .count("id as total_students")
      .first();
  }
  public async pendingRequestCountQuery() {
    return await User.query()
      .where("status", "=", '0')
      .count("id as total_pending_requests")
      .first();
  }
  public async allAppointmentsCountQuery(teacherId: number) {
    return await Appointment.query()
      .where("teacher_id", "=", teacherId)
      .count("id as all_appointments_count")
      .first();
  }
  public async allAppointmentsCountForStudent(studentId: number) {
    return await Appointment.query()
      .where("student_id", "=", studentId)
      .where("status", "=", "1")
      .orWhere("status", "=", "0")
      .count("id as all_appointments_count")
      .first();
  }
  public async pendingAppointmentsCountQuery(teacherId: number) {
    return await Appointment.query()
      .where("teacher_id", "=", teacherId)
      .where("status", "0")
      .count("* as pending_appointments_count")
      .first();
  }
  public async StudentsPendingAppointmentsCountQuery(studentId: number) {
    return await Appointment.query()
      .where("student_id", "=", studentId)
      .where("status", "0")
      .count("* as pending_appointments_count")
      .first();
  }
  public async todaysAppointmentsCountQuery(teacherId: number) {
    return await Appointment.query()
      .where("teacher_id", "=", teacherId)
      .where("status", "=", "1")
      .whereRaw("DATE(date) = CURDATE()")
      .count("id as todays_appointments_count")
      .first();
  }
  public async studentsTodaysAppointmentsCountQuery(studentId: number) {
    return await Appointment.query()
      .where("student_id", "=", studentId)
      .where("status", "=", "1")
      .whereRaw("DATE(date) = CURDATE()")
      .count("id as todays_appointments_count")
      .first();
  }
  public async upComingAppointmentsCountQuery(teacherId: number) {
    return await Appointment.query()
      .where("teacher_id", "=", teacherId)
      .where("status", "=", "1")
      .whereRaw("DATE(date) > CURDATE()")
      .count("id as up_coming_appointments_count")
      .first();
  }
    async adminListQuery() {
        const users = await User.query().where("user_type", "admin");
        return users;
    }
}
