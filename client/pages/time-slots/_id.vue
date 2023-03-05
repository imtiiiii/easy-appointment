<template>
  <div>
    <div>
      <profile-details v-bind:userId="id"></profile-details>
    </div>
    <hr />
    <h6 style="text-align: center">
      Look for available appointment schedules:
    </h6>
    <div class="available-bookings">
      <div>
        <DatePicker
          type="date"
          size="large"
          :disabled="slotLoading"
          placeholder="Select date"
          style="width: 540px"
          @on-change="getDate"
          :editable="false"
        ></DatePicker>
      </div>
      <div v-if="slots.length !== 0" class="slot">
        <div v-for="(slot, index) of slots" :key="index">
          <button v-on:click="slotId(slot.id)" class="time-slot-cards">
            {{ timeConvert(slot.start_time) }} -
            {{ timeConvert(slot.end_time) }}
          </button>
          <div style="margin: 20px 0px" v-if="choosedSlotId === slot.id">
            <div class="_log_input_group">
              <Input
                placeholder="Agenda in short"
                size="large"
                type="text"
                v-model="agenda"
              ></Input>
              <!-- *********** -->
              <button
                v-on:click="sendReq(slot.id, slot.start_time, slot.end_time)"
                :loading="isLoading"
                :disabled="isLoading"
                class="send-req-btn"
              >
                {{ isLoading ? "Please wait..." : "Send request" }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="selectedDate === null">
        <p style="text-align: center">
          <strong> Select a date from calendar to see available slots </strong>
        </p>
      </div>
      <div v-else>
        <p style="text-align: center">No slots available</p>
      </div>
    </div>
  </div>
</template>

<script>
import profileDetails from "../../components/profileDetails.vue";
import moment from "moment";
moment().format();
export default {
  components: { profileDetails },
  data() {
    return {
      id: this.$route.params.id,
      date_today: new Date(moment()),
      slots: [],
      agenda: "",
      choosedSlotId: null,
      previousDates: {},
      day_no_id: null,
      date: null,
      slotLoading: false,
      selectedDate: null,
    };
  },

  methods: {
    slotId(id) {
      this.choosedSlotId = id;
    },
    async sendReq(timeSlotId, startTime, endTime) {
      this.date = moment(this.date);
      if (this.agenda === null || this.agenda === "") {
        return this.e("Mention your agenda for meeting");
      }
      const data = {
        time_slot_id: timeSlotId,
        date: this.date.format("YYYY-MM-DD"),
        start_time: startTime,
        end_time: endTime,
        agenda: this.agenda,
        teacher_id: this.id,
      };

      const req = await this.callApi("post", "/appointments/request", data);
      console.log("req is", req);
      if (req?.status === 200) {
        this.agenda = "";
        this.choosedSlotId = -1;
        this.i(`${req.data.msg}`);
      } else if (req?.status === 500) {
        this.agenda = "";
        this.choosedSlotId = -1;
        this.i(`${req.data}`);
      } else {
        this.agenda = "";
        this.choosedSlotId = -1;
        this.e("Something went wrong, try again");
      }
      this.isLoading = false;
    },
    async getDate(date) {
      this.selectedDate = date;
      this.slotLoading = true;
      this.date = moment(date);
      this.day_no_id = this.date.day();
      const res = await this.callApi("post", `/time-slots/get-teacher-slots`, {
        day_no_id: this.day_no_id,
        date: this.date.format("YYYY-MM-DD"),
        teacher_id: this.id,
      });
      if (res?.status === 200) {
        this.slots = res.data;
      }
      this.slotLoading = false;
    },
  },
  watch: {
    timings: function () {},
    disableDates: function () {},
  },
  computed: {
    disableDates() {
      let fullDate = moment(); //get the full date
      let dateOfAmonth = fullDate.get("date"); //date of the month
      fullDate.set("date", dateOfAmonth - 1); //setting date to  the previous day
      const yesterday = new Date(fullDate);
      // console.log("yestarday is ", yesterday);
      this.previousDates = {
        ranges: [
          {
            // Disable dates in given ranges (exclusive).
            from: new Date(1950, 11, 25),
            to: yesterday,
          },
        ],
      };
    },
  },
};
</script>

<style>
.available-bookings {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-row-gap: 36px;
  margin: 20px;
  padding: 30px 20px;
  grid-column-gap: 20px;
}
.slot {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
.time-slot-cards {
  background-color: #404040;
  padding: 20px 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
.send-req-btn {
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  margin-top: 5px;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
</style>
