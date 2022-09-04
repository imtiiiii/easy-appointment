import AppoinmentQuery from "./AppoinmentsQuery";

export default class AppoinmentService {
  private appoinmentQuery: AppoinmentQuery;

  constructor() {
    this.appoinmentQuery = new AppoinmentQuery();
  }
  public async upCommingAppoinments(ctx) {
    const teacher_id = ctx.auth.user.id;

    return this.appoinmentQuery.upCommingAppoinments(teacher_id);
  }

  public async toggleStatusService(payload) {
    
    return await this.appoinmentQuery.toggleStatusQuery(payload);
  }
  public async bookingReqService(payload) {
    return await this.appoinmentQuery.bookingReqQuery(payload);
  }
  public async acceptedAppointmentsService(teacher_id) { 
    return await this.appoinmentQuery.acceptedAppointmentsQuery(teacher_id)

  }
}
