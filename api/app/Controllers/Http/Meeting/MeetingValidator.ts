import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
export default class MeetingValidator {
  public async validateMeetingSchema(ctx: HttpContextContract) {
    const meetingSchema = schema.create({
      agenda: schema.string(),
      link: schema.string(),
      description: schema.string(),
      datetime: schema.date(),
      invitees: schema.array().members(schema.object().anyMembers()),
    });

    return await ctx.request.validate({
      schema: meetingSchema,
    });
  }
  async validateSingleMeetingInfo(ctx: HttpContextContract) {
    const meetingSchema = schema.create({
      meetingId: schema.number([
        rules.exists({ table: "meeting_rooms", column: "id" }),
      ]),
    });
    return await ctx.request.validate({
      schema: meetingSchema,
    });
  }
}
