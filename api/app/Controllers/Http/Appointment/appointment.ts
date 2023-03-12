import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.post("/request", "Appointment/AppointmentsController.request") //By Student
    Route.get("/student-appointment-history", "Appointment/AppointmentsController.studentAppointmentHistory") //By Student
    Route.get('/upComingAppointments', "Appointment/AppointmentsController.upComingAppointments") //By teacher
    Route.get("/", "Appointment/AppointmentsController.appointments") //By teacher
    Route.post("/status", "Appointment/AppointmentsController.toggleStatus"); // By teacher
    Route.get("/booked", "Appointment/AppointmentsController.alreadyBooked")
    Route.get("/accepted", "Appointment/AppointmentsController.accepted")//by teacher
}).prefix("appointments").middleware("auth")