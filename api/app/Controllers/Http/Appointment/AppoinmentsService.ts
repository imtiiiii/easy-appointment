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

  public async status(ctx) {
    const { appointmentId, status } = ctx.request.only([
      "appointmentId",
      "status",
    ]);
    const changeStatusFor = {
      appointmentId,
      status,
    };
    return await this.appoinmentQuery.status(changeStatusFor);
  }
  public async bookingReqService(payload) {
    return await this.appoinmentQuery.bookingReqQuery(payload);
  }
}
