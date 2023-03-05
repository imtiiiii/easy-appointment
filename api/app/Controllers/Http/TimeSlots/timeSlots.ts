import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post("/add", "TimeSlots/TimeSlotsController.addTimeSlots");
    Route.post("/created", "TimeSlots/TimeSlotsController.createdSlots")
    Route.get('/available', "TimeSlots/TimeSlotsController.available")
    Route.put('/update', "TimeSlots/TimeSlotsController.update")
    Route.post("/get-teacher-slots", "TimeSlots/TimeSlotsController.slots")
    Route.delete('/delete',"TimeSlots/TimeSlotsController.delete")
}).prefix("/time-slots").middleware('auth')