// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MeetingQuery from "../Meeting/MeetingQuery";
import DashboardAdminQuery from "./DashboardAdminQuery";
export default class DashboardAdminService {
  private dashboardAdminQuery: DashboardAdminQuery;
  private meetingQuery: MeetingQuery;
  constructor() {
    this.dashboardAdminQuery = new DashboardAdminQuery();
    this.meetingQuery = new MeetingQuery();
  }
  public async adminDashboardService() {
    const allUsersCount = await this.dashboardAdminQuery.allUsersCountQuery();
    const teacherCount = await this.dashboardAdminQuery.teacherCountQuery();
    const studentCount = await this.dashboardAdminQuery.studentCountQuery();
    const pendingRequestCount =
      await this.dashboardAdminQuery.pendingRequestCountQuery();
    return {
      allUsersCount,
      teacherCount,
      studentCount,
      pendingRequestCount,
    };
  }
  public async teacherDashboardService(teacherId: number) {
    const allAppointmentsCount =
      await this.dashboardAdminQuery.allAppointmentsCountQuery(teacherId);
    const pendingAppointmentsCount =
      await this.dashboardAdminQuery.pendingAppointmentsCountQuery(teacherId);
    const todaysAppointmentsCount =
      await this.dashboardAdminQuery.todaysAppointmentsCountQuery(teacherId);
    const upComingAppointmentsCount =
      await this.dashboardAdminQuery.upComingAppointmentsCountQuery(teacherId);
    const totalMeetings = await this.meetingQuery.countMeetingsQuery(teacherId);
    return {
      allAppointmentsCount,
      pendingAppointmentsCount,
      todaysAppointmentsCount,
      upComingAppointmentsCount,
      totalMeetings,
    };
  }
  public async studentDashboardService(studentId: number) {
    const allAppointmentsCount =
      await this.dashboardAdminQuery.allAppointmentsCountForStudent(studentId);
    const pendingAppointmentsCount =
      await this.dashboardAdminQuery.StudentsPendingAppointmentsCountQuery(
        studentId
      );
    const todaysAppointmentsCount =
      await this.dashboardAdminQuery.studentsTodaysAppointmentsCountQuery(
        studentId
      );
    const totalMeetings = await this.meetingQuery.countMeetingsQuery(studentId);

    return {
      allAppointmentsCount,
      pendingAppointmentsCount,
      todaysAppointmentsCount,
      totalMeetings,
    };
  }
  async adminListService() {
    return await this.dashboardAdminQuery.adminListQuery();
  }
}
