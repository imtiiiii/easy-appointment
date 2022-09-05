<template>
  <div
    style="
      background-color: #9cb0ba;
      margin: 10px 20px;
      padding: 20px 10px;
      height: 400vh;
    "
  >
    <div>
      <profile-details v-bind:userId="id"></profile-details>
    </div>
    <hr />
    <h3
      style="
        text-align: center;
        margin-bottom: 80px;
        text-decoration: underline;
      "
    >
      Look for available appointment schedules:
    </h3>
    <div class="available-bookings">
      <div>
        <DatePicker
          type="date"
          placeholder="Select date"
          style="width: 240px"
          @on-change="getDate"
        ></DatePicker>
      </div>
      <div v-if="slots.length !== 0" class="slot">
        <div v-for="(slot, index) of slots" :key="index">
          <button
            v-on:click="slotId(slot.id)"
            class="update"
            style="background-color: #42cc8c; width: 100%; padding: 15px 0px"
          >
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
                v-on:click="
                  sendReq(slot.id, id, slot.start_time, slot.end_time)
                "
                :loading="isLoading"
                :disabled="isLoading"
                class="update"
                style="
                  background-color: #e182af;
                  padding: 10px 05px;
                  margin-top: 5px;
                "
              >
                {{ isLoading ? "Please wait..." : "Send request" }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h1 style="text-align: center">No slots available</h1>
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
      date: null
    };
  },

  methods: {
    slotId(id) {
      this.choosedSlotId = id;
    },
    async sendReq(timeSlotId, teacherId, startTime, endTime) {
      this.date = moment(this.date);
      const data = {
        time_slot_id: timeSlotId,
        date: this.date.format("YYYY-MM-DD"),
        start_time: startTime,
        end_time: endTime,
        agenda: this.agenda,
        teacher_id: this.id
      };

      if (this.agenda === null || this.agenda === "") {
        this.isLoading = false;
        return this.e("Mention your agenda for meeting");
      }
      const req = await this.callApi("post", "/appointments/request", data);
      console.log("req is", req);
      console.log("req is ", req);
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
    async getDate(data) {
      console.log("called", data);
      this.date = moment(data);
      this.day_no_id = this.date.day();
      try {
        const res = await this.callApi(
          "get",
          `/time-slots/?day_no_id=${this.day_no_id}&date=${this.date.format(
            "YYYY-MM-DD"
          )}&teacher_id=${this.id}`
        );
        this.slots = res.data;
      } catch (error) {}
    }
  },
  watch: {
    timings: function() {},
    disableDates: function() {}
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
            to: yesterday
          }
        ]
      };
    }
  }
};
</script>

<style>
.available-bookings {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-row-gap: 26px;
}
.slot {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
}
</style>