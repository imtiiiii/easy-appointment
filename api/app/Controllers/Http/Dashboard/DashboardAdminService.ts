// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import DashboardAdminQuery from './DashboardAdminQuery';
export default class DashboardAdminService {
    private dashboardAdminQuery: DashboardAdminQuery;
    constructor() {
        this.dashboardAdminQuery = new DashboardAdminQuery()
    }
    public async adminDashboardService() { 
        const allUsersCount = await this.dashboardAdminQuery.allUsersCountQuery()
        const teacherCount = await this.dashboardAdminQuery.teacherCountQuery()
        const studentCount = await this.dashboardAdminQuery.studentCountQuery()
        const pendingRequestCount = await this.dashboardAdminQuery.pendingRequestCountQuery()
        return {
            allUsersCount,
            teacherCount,
            studentCount,
            pendingRequestCount
        }
       
    }
}