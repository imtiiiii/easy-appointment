// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import DashboardAdminQuery from "./DashboardAdminQuery";
export default class DashboardAdminService {
  private dashboardAdminQuery: DashboardAdminQuery;
  constructor() {
    this.dashboardAdminQuery = new DashboardAdminQuery();
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
    return {
      allAppointmentsCount,
      pendingAppointmentsCount,
      todaysAppointmentsCount,
      upComingAppointmentsCount,
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

    return {
      allAppointmentsCount,
      pendingAppointmentsCount,
      todaysAppointmentsCount,
    };
  }
}
