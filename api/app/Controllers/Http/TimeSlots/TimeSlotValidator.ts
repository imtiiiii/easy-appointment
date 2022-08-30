import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
const msg = {
  "day_no.required": "Day number is missing",
  "day_no.range": "Day number should be from 0 to 6",
  "duration.required": "Duration is required",
  "duration.number": "Duration should be a number",
  "start_time.required": "Start time is required",
  "start_time.date": "Start time is not a valid time",
  "end_time.required": "End time is required",
  "end_time.date": "End time is not a valid time",
  "end_time.afterField": "End time should be after the start time",
};
export default class TimeSlotValidator {
  public async created(ctx: HttpContextContract) {
    const availableSlotSchema = schema.create({
      day: schema.number(),
    });

    try {
      const payload = await ctx.request.validate({
        schema: availableSlotSchema,
      });
      return payload;
    } catch (error) {
      const errorObject = JSON.stringify(error.messages);
      throw errorObject;
    }
  }
  public async update(ctx: HttpContextContract) {
    const updateSchema = schema.create({
      dayId: schema.number(),
      slotId: schema.number(),
      newStartTime: schema.string({ trim: true }, [
        rules.regex(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/),
      ]),
      newEndTime: schema.string({ trim: true }, [
        rules.regex(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/),
      ]),
    });

    const schemaValidationMessage = {
      required: "The {{ field }} is required to create a new account",
      "newStartTime.regex": "New Start Time Input is not valid.(ex: hh:mm:ss)",
      "endStartTime.regex": "New Start Time Input is not valid.(ex: hh:mm:ss)",
    };

    try {
      await ctx.request.validate({
        schema: updateSchema,
        messages: schemaValidationMessage,
      });
    } catch (error) {
      const errorStringigyObj = JSON.stringify(error.messages);
      throw errorStringigyObj;
    }
  }
  public async validateAddingTimeSlots(ctx: HttpContextContract) {
    const timeSlotData = schema.create({
      day_no: schema.number([rules.range(0, 6)]),
      duration: schema.number(),
      start_time: schema.date({
        format: "HH:mm",
      }),
      end_time: schema.date(
        {
          format: "HH:mm",
        },
        [rules.afterField("start_time")]
      ),
    });
    const payload = await ctx.request
      .validate({ schema: timeSlotData, messages: msg })
      .catch((err) => {
        return ctx.response.status(422).send(err.messages);
      });
    return payload;
  }
}
