import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import TimeSlotValidator from "./TimeSlotValidator";
import TimeSlotService from "./TimeSlotService";

export default class TimeSlotsController {
  private timeSlotValidator: TimeSlotValidator;
  private timeSlotService: TimeSlotService;

  constructor() {
    this.timeSlotService = new TimeSlotService();
    this.timeSlotValidator = new TimeSlotValidator();
  }
  public async addTimeSlots(ctx: HttpContextContract) {
    const payload = await this.timeSlotValidator
      .validateAddingTimeSlots(ctx)
      .catch((err) => {
        return ctx.response.status(422).send(err.messages);
      });
     
      
    return await this.timeSlotService.timeSlotService(
      payload,
      ctx?.auth?.user?.id
    );
  }

  public async slots(ctx: HttpContextContract) {
    try {
      const payload = await this.timeSlotValidator.validateShowSlots(ctx);
      return await this.timeSlotService.showSlotsService(payload);
    } catch (error) {
      return ctx.response.status(422).send(error.messages);
    }
  }
  //TODO: This Controller only accessable by teacher type user
  public async createdSlots(ctx: HttpContextContract) {
    try {
      const payload = await this.timeSlotValidator.createdSlots(ctx);
      payload["userId"] = ctx.auth.user?.$attributes.id
      console.log("payload",payload);
      return await this.timeSlotService.createdSlotsService(payload);
    } catch (error) {
      
      return ctx.response.status(422).send(error)
    }
    
  }
  //TODO: This Controller only accessable by teacher type user
  public async available(ctx: HttpContextContract) {
    return this.timeSlotService.available(ctx);
  }
  //TODO: This controller only accessable by teacher
  public async update(ctx: HttpContextContract) {
    try {
      await this.timeSlotValidator.update(ctx);
    } catch (error) {
      const errorObj = JSON.parse(error);
      return ctx.response.status(422).send({
        status: "BAD",
        message: errorObj,
        result: [],
      });
    }
    return this.timeSlotService.update(ctx);
  }
  //TODO: This controller only accessable by teacher
  public async delete(ctx: HttpContextContract) {
    return this.timeSlotService.delete(ctx);
  }
}
