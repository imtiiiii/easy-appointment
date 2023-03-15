import Route from '@ioc:Adonis/Core/Route'
Route.group(()=>{
  Route.post('create', 'Meeting/MeetingController.createMeeting')
  Route.get("meeting-list", "Meeting/MeetingController.getMeetingList")
}).prefix('meeting').middleware('auth')
