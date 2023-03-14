import Route from '@ioc:Adonis/Core/Route'
// * admin dashboard
Route.group(() => {
    Route.get("/", "Dashboard/DashboardAdminsController.adminDashboard")
    Route.get("/request", "Dashboard/DashboardAdminsController.requested")
    Route.get("/rejected-signup-request", "Dashboard/DashboardAdminsController.rejectedSignupRequests")
    Route.put("/update/status", "Dashboard/DashboardAdminsController.updateStatus")
    Route.get("/student-list/", "Dashboard/DashboardAdminsController.studentList")
    Route.get("/teacher-list/", "Dashboard/DashboardAdminsController.teacherList")
    Route.get("/admin-list/", "Dashboard/DashboardAdminsController.adminList")
    Route.get("/teacher-list/search", "Dashboard/DashboardAdminsController.searchTeacher")
    Route.get('/teacher', 'Dashboard/DashboardAdminsController.teacherDashboard')
    Route.get('/student', 'Dashboard/DashboardAdminsController.studentDashboard')
}).prefix("dashboard").middleware("auth")