import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MeetingService from './MeetingService';
import MeetingValidator from './MeetingValidator';
export default class MeetingController {
  private meetingService : MeetingService
  private meetingValidator : MeetingValidator
  constructor () {
    this.meetingService =  new MeetingService()
    this.meetingValidator =  new MeetingValidator()
  }
  public async getMeetingByLimit(ctx : HttpContextContract) {
    await this.meetingValidator.validateMeetingSchema(ctx)
    return this.meetingService.getMeetingByLimit(ctx)
  }
  async createMeeting(ctx : HttpContextContract) {
    if(!ctx.auth.user) {
      return ctx.response.status(403).send({
        error: 'User is not logged in'
      })
    }
    try {
       const payload =  await this.meetingValidator.validateMeetingSchema(ctx)
         return this.meetingService.createMeetingService(ctx.auth.user.id, payload)
        
    } catch (error) {
        return ctx.response.status(422).send(error)
    }
  }
}
