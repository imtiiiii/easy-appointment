import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
export default class MeetingValidator {
  public async validateMeetingSchema(ctx: HttpContextContract) {
    const meetingSchema = schema.create({
      agenda: schema.string(),
      link: schema.string(),
      description: schema.string(),
      datetime: schema.date(),
      invitees: schema
        .array()
        .members(
          schema.number([rules.exists({ table: "users", column: "id" })])
        ),
    });

   return await ctx.request.validate({
      schema: meetingSchema,
    });
  }
}
