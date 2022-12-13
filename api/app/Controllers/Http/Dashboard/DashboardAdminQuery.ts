// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from '../../../Models/User';
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
      .where("status", '=',0)
      .count("id as total_pending_requests")
      .first();
  }
}
