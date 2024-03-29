import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import DashboardAdminService from './DashboardAdminService';

export default class DashboardAdminsController {
    private dashboardAdminService: DashboardAdminService ;
    constructor() { 
        this.dashboardAdminService = new DashboardAdminService()
    }
    public async test(ctx: HttpContextContract) {
        return { msg: "dashboard running" }

    }
    public async requested(ctx: HttpContextContract) {
        const users = await User.query().where("status", "0")
        return users
    }
    public async rejectedSignupRequests(ctx: HttpContextContract) {

        const users = await User.query().where("status", "2")
        return users
    }
    public async updateStatus(ctx: HttpContextContract) {
        // update users registration request
        /**
            * 0 -> pending
            * 1 -> accepted
            * 2 -> rejected
            */
        const data = ctx.request.all();
        const id = data.id;
        const status = data.status;
        const user = await User.query().where("id", id)
            .update({ status: status });
        return user
    }
    // get all students list
    public async studentList(ctx: HttpContextContract) {
        const users = await User.query().where("user_type", "student");
        return users;

    }
    // get all teachers list
    public async teacherList(ctx: HttpContextContract) {
        const users = await User.query().where("user_type", "teacher").andWhere("status", "1")
        return users;

    }
    public async searchTeacher(ctx: HttpContextContract) {
        const value = ctx.request.qs().value;
        const teachers = await User.query().where((query) => {
            query.where("user_type", "teacher").where(search => {
                search.where("first_name", "like", `%${value}%`).orWhere("last_name", "like", `%${value}%`)
                    .orWhere("dept", "like", `%${value}%`)
            })
        })
        return teachers
    }
    public async adminDashboard(ctx: HttpContextContract) {
        if(ctx.auth.user?.user_type !== "admin"){
            return ctx.response.status(422).json({ msg: "You are not authorized to access this page" })
        }
        try {
            return  this.dashboardAdminService.adminDashboardService()
        } catch (error) {
            return error
        }

    }
    public async teacherDashboard(ctx: HttpContextContract) { 
        if(ctx.auth.user?.user_type !== "teacher"){
            return ctx.response.status(422).json({ msg: "You are not authorized to access this page" })
        }
        try {
            return  this.dashboardAdminService.teacherDashboardService(ctx.auth.user.id)
        } catch (error) {
            return error
        }
    }
    public async studentDashboard(ctx: HttpContextContract) {
        if(ctx.auth.user?.user_type !== "student"){
            return ctx.response.status(422).json({ msg: "You are not authorized to access this page" })
        }
        try {
            return  this.dashboardAdminService.studentDashboardService(ctx.auth.user.id)
        } catch (error) {
            return error
        }
    }
    public async adminList(ctx: HttpContextContract) {
        if(ctx.auth.user?.user_type !== "admin"){
            return ctx.response.status(422).json({ msg: "You are not authorized to access this page" })
        }
        try {
            return  this.dashboardAdminService.adminListService()
        } catch (error) {
            return error
        }
    }
}
