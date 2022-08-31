import TimeSlot from "App/Models/TimeSlot";
import { DateTime } from "luxon";

export default class TimeSlotQuery {
  public async created(slotsFor) {
    const slots = await TimeSlot.query()
      .where("teacher_id", slotsFor.id)
      .andWhere("day_no_id", 1)
      .select("id", "start_time", "end_time", "day_no_id")
      .orderBy("start_time", "asc");
    return slots
  }

  public async available(availableSlotsFor) {
    //    const createdSlots = await this.created(availableSlotsFor);
    //    let createdSlotsJSON = createdSlots.map((createdSlots)=> createdSlots.toJSON())
    //     const createdSlotsJSON = await this.created(availableSlotsFor);
    //    const beginingTime = {
    //        id: availableSlotsFor.id,
    //        start_time:'00:00:00',
    //        end_time:'00:00:00',
    //        day_id:availableSlotsFor.dayId
    //    }
    //    const endTime = {
    //         id: availableSlotsFor.id,
    //         start_time:'23:59:00',
    //         end_time:'23:59:00',
    //         day_id:availableSlotsFor.dayId
    //     }
    //     createdSlotsJSON.unshift(beginingTime);
    //     createdSlotsJSON.push(endTime);
    //     let availableSlots = [];
    //     for(let i=0;i<createdSlotsJSON.length-1;i++){
    //         let endTime = moment(createdSlotsJSON[i].end_time,'HH:mm:ss');
    //         let startTime = moment(createdSlotsJSON[i+1].start_time,'HH:mm:ss');
    //         let dif = startTime.diff(endTime,'milliseconds');
    //         /**
    //          *  We take 3 minute as time gap to choose it available time slot
    //          */
    //         let timeThreshold = 3
    //         if(dif> timeThreshold*60*1000){
    //             endTime.add(1,'minutes');
    //             startTime.subtract(1,'minutes');
    //             const newStart = endTime.format('HH:mm:ss');
    //             const newEnd = startTime.format('HH:mm:ss');
    //             /**
    //              *  New Available Time Slot Object
    //              */
    //             const obj = {
    //                 'start_time': newStart,
    //                 'end_time': newEnd,
    //             }
    //             availableSlots.push(obj);
    //         }
    //     }
    //     return availableSlots;
  }

  /**
   * Good Function related with update function.
   */
  public good(allCreatedSlots, updateFor, beUpdate, mid) {
    /**
     *  beUpdate Slot startTime with moment.js
     */
    // const startTime = moment(beUpdate.start_time,'HH:mm:ss');
    // const currentStartTime = moment(allCreatedSlots[mid].start_time,'HH:mm:ss');
    // let dif = currentStartTime.diff(startTime).valueOf(); // get difference in milisecond by valueOf()
    // if(dif>=0){ // currentStartTime grater than startTime
    //     return true;
    // }
    // return false;
  }

  public async update(updateFor) {
    // try {
    //     const allCreatedSlots = await this.created({
    //         id:updateFor.userId,
    //         dayId: updateFor.dayId
    //     })
    //     let beUpdate = await TimeSlot.findBy('id',updateFor.slotId);
    //     beUpdate = beUpdate?.serialize();
    //     // console.log(beUpdate);
    //     let left = -1; // allCreatedSlots[left] < desireData
    //     let right = allCreatedSlots.length; // desireData <= allCreatedSlots[right]
    //     while(right > left + 1){
    //         let mid = Math.floor((left+right)/2);
    //         if(this.good(allCreatedSlots,updateFor,beUpdate,mid)){
    //             right = mid;
    //         }else{
    //             left = mid;
    //         }
    //     }
    //     // console.log('Hello World',right);
    //     let newStartTime = moment(updateFor.newStartTime,'HH:mm:ss');
    //     let newEndTime = moment(updateFor.newEndTime,'HH:mm:ss');
    //     if(right==0){
    //         let previousEndTime = moment('00:00:00','HH:mm:ss');
    //         let nextStartTime = moment(allCreatedSlots[right+1].start_time,'HH:mm:ss');
    //         if( nextStartTime.diff(previousEndTime).valueOf() > 0 && nextStartTime.diff(newEndTime).valueOf() > 0){
    //             const slot = await TimeSlot.findOrFail(updateFor.slotId);
    //             // console.log('It is here');
    //             slot.startTime = newStartTime.format('HH:mm:ss').toString();
    //             slot.endTime = newEndTime.format('HH:mm:ss').toString();
    //             await slot.save()
    //         }else{
    //             let erroObj = {
    //                 messages:['New TimeStamp Conflicting with both previous or next slot']
    //             }
    //             throw erroObj;
    //         }
    //     }else if(right==allCreatedSlots.length-1){
    //         let nextStartTime = moment("23:59:00",'HH:mm:ss');
    //         let previousEndTime = moment(allCreatedSlots[right-1].end_time,'HH:mm:ss');
    //         if(newStartTime.diff(previousEndTime).valueOf() > 0 && nextStartTime.diff(newEndTime).valueOf() > 0){
    //             const slot = await TimeSlot.findOrFail(updateFor.slotId);
    //             // console.log('It is here');
    //             slot.startTime = newStartTime.format('HH:mm:ss').toString();
    //             slot.endTime = newEndTime.format('HH:mm:ss').toString();
    //             await slot.save()
    //         }else{
    //             let erroObj = {
    //                 messages:['New TimeStamp Conflicting with both previous or next slot']
    //             }
    //             throw erroObj;
    //         }
    //     }else{
    //         let previousSlotEndTime = moment(allCreatedSlots[right-1].end_time,'HH:mm:ss');
    //         let nextSlotStartTime = moment(allCreatedSlots[right+1].start_time,'HH:mm:ss');
    //         /**
    //          * newStartTime > preEndTime && nextStartTime > newEndTime
    //          */
    //         // console.log(newStartTime.diff(previousSlotEndTime).valueOf())
    //         // console.log(nextSlotStartTime.diff(newEndTime).valueOf())
    //         if(newStartTime.diff(previousSlotEndTime).valueOf()>0 && nextSlotStartTime.diff(newEndTime).valueOf() > 0){
    //             const slot = await TimeSlot.findOrFail(updateFor.slotId);
    //             // console.log('It is here');
    //             slot.startTime = newStartTime.format('HH:mm:ss').toString();
    //             slot.endTime = newEndTime.format('HH:mm:ss').toString();
    //             await slot.save()
    //         }
    //         else{
    //             let erroObj = {
    //                 messages:['New TimeStamp Conflicting with both previous or next slot']
    //             }
    //             throw erroObj;
    //         }
    //     }
    // } catch (error) {
    //     const errorStringifyObj = JSON.stringify(error.messages);
    //     throw errorStringifyObj
    // }
  }

  public async delete(deleteData) {
    // return await TimeSlot.query().where('id',deleteData.slotId).andWhere('teacherId',deleteData.userId).delete();
  }
  public async saveTimeSlotQuery(data) {
    return await TimeSlot.createMany(data);
  }
  public async validateSlotsQuery(data) {
    // console.log(data);
    const validatedSlots = new Array();
    await Promise.all(
      await data.map(async (el) => {
        const query = await TimeSlot.query()
          .andWhere("day_no_id", "=", `${el.day_no_id}`)
          .andWhere("teacher_id", `${el.teacher_id}`)
          .andWhere((q1) => {
            q1.andWhere("start_time", "<=", `${el.start_time}`)
              .andWhere("end_time", ">=", `${el.start_time}`)
              .orWhere((q2) => {
                q2.where("start_time", "<", `${el.end_time}`).where(
                  "end_time",
                  ">=",
                  `${el.end_time}`
                );
              });
          })

          .first();
        console.log(query?.$attributes.id);
        console.log(query?.$attributes.day_no_id);
        if (query == null) {
          console.log("cre");
          validatedSlots.push(el);
        }
      })
    );
    return validatedSlots;
  }
  public async showSlotsQuery(data) {
    const getSlots = await TimeSlot.query()
      .where('teacher_id', `${data.teacher_id}`)
      .where('day_no_id', `${data.day_no_id}`)
      .whereDoesntHave('teacherAppointments', (q) => { q.where('date', `${data.date}`)})
    return getSlots;
  }
  
}
