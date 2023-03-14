<template>
  <div>
    <div
      v-if="$store.state.authUser.user_type === 'teacher'"
      class="container_admin"
    >
      <!-- <div class="container_child">
        <h3>All appointments : {{ allUsersCount }}</h3>
      </div> -->
      <div class="container_child">
        <h3>Today's appointments : {{ todaysAppointments }}</h3>
      </div>

      <div class="container_child">
        <h3>Appointment requests : {{ appointmentRequests }}</h3>
      </div>
      <div class="container_child">
        <h3>Upcoming appointments : {{ upComingAppointments }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import "vue2-timepicker/dist/VueTimepicker.css";
import createdSlot from "./createdSlots.vue";

import upcommingAppoinments from "./upcommingAppoinments.vue";
import moment, { duration, min } from "moment";
moment().format();

export default {
  components: {
    "vue-timepicker": VueTimepicker,
    "created-slot": createdSlot,

    "uppcomming-appoinments": upcommingAppoinments,
  },
  data() {
    return {
      user: null,
      options: "index", // possible variable appoinment,inde
      timeSlotForm: {
        dayNo: null,
        duration: null,
        startTime: null,
        endTime: null,
      },
      todaysAppointments: 0,
      appointmentRequests: 0,
      upComingAppointments: 0,

      ruleValidate: {
        startTime: [
          {
            required: true,
            message: "Start and End time required",
          },
        ],
        endTime: [
          {
            required: true,
            message: "Start and End time required",
          },
        ],
        dayNo: [
          {
            required: true,
            message: "Please Select day",
          },
        ],
        duration: [
          {
            required: true,
            message: "Please select the duration of each slot",
          },
        ],
      },
    };
  },
  async created() {
    this.user = this.$store.state.authUser;
    const { data } = await this.callApi("get", "/dashboard/teacher");
    console.log("🚀 ~ file: teacherDashboard.vue:203 ~ created ~ data", data);
    this.todaysAppointments =
      data.todaysAppointmentsCount.todays_appointments_count;
    this.appointmentRequests =
      data.pendingAppointmentsCount.pending_appointments_count;
    this.upComingAppointments =
      data.upComingAppointmentsCount.up_coming_appointments_count;
  },
  methods: {
    jumptoAcceptedRequest() {
      console.log("im called accepted");
      this.$router.push(`/accepted-appointments/${this.user.id}`);
    },

    chooseOption(value) {
      if (this.options === "index") {
        this.options = "appoinment";
      } else {
        this.options = "index";
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.validateTimeSlotData(this.timeSlotForm);
        } else {
          this.$Message.error("Fail!");

          return;
        }
      });
    },
    async validateTimeSlotData(data) {
      let startTime = moment(data.startTime, "hh:mm a");
      let endTime = moment(data.endTime, "hh:mm a");

      if (!startTime.isBefore(endTime)) {
        this.e("End time can not be before start time");
        return;
      }

      try {
        const req = await this.callApi("post", "/time-slots/add", {
          day_no: data.dayNo,
          duration: data.duration,
          start_time: startTime.format("HH:mm"),
          end_time: endTime.format("HH:mm"),
        });

        if (req.status === 200 || req.status === 201) {
          this.i(`${req.data?.length} slots created`);
        }
      } catch (error) {
        this.swr();
      }
    },
  },
};
</script>

<style scoped>
/* .main-content {
  height: 100%;
  display: grid;
  grid-template: 100% /1fr 1fr;
  gap: 30px;
  padding: 50px 40px;
}
.add-time-slot {
  background-color: #fff;
  padding: 30px 10px;
} */
.container_admin {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.container_child {
  width: 20%;
  height: 100px;
  background-color: #f1f1f1;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
