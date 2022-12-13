import Route from '@ioc:Adonis/Core/Route'
// * admin dashboard
Route.group(() => {
    Route.get("/", "Dashboard/DashboarAdminsController.adminDashboard")
    Route.get("/request", "Dashboard/DashboarAdminsController.requested")
    Route.put("/update/status", "Dashboard/DashboarAdminsController.updateStatus")
    Route.get("/student-list/", "Dashboard/DashboarAdminsController.studentList")
    Route.get("/teacher-list/", "Dashboard/DashboarAdminsController.teacherList")
    Route.get("/teacher-list/search", "Dashboard/DashboarAdminsController.searchTeacher")
}).prefix("dashboard").middleware("auth")