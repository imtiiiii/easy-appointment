<template>
  <div>
    <div
      v-if="$store.state.authUser.user_type === 'student'"
      class="container_admin"
    >
      <div class="container_child">
        <h3>All appointments : {{ appointmentRequests ?? 0 }}</h3>
      </div>
      <div class="container_child">
        <h3>Today's appointments : {{ todaysAppointments ?? 0 }}</h3>
      </div>
      <div class="container_child">
        <h3>Pending appointments : {{ pendingRequests ?? 0 }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import teacherList from "../adminDashboard/teacherList.vue";

import moment from "moment";
import StudentsAppointment from "./studentsAppointment.vue";
moment().format();
export default {
  components: { teacherList, StudentsAppointment },
  data() {
    return {
      showTeacherList: false,
      showHistory: false,
      showUpcomingMeeting: false,
      type: "",
      todaysAppointments: 0,
      appointmentRequests: 0,
      pendingRequests: 0,
    };
  },
  async created() {
    const { data } = await this.callApi("get", "/dashboard/student");
    console.log("🚀 ~ file: studentDashboard.vue:39 ~ data:", data);
    this.todaysAppointments =
      data.todaysAppointmentsCount.todays_appointments_count;
    this.appointmentRequests =
      data.allAppointmentsCount.all_appointments_count;
    this.pendingRequests =
      data.pendingAppointmentsCount.pending_appointments_count;
  },
  methods: {
    seeTeachers() {
      this.showTeacherList = !this.showTeacherList;

      this.showHistory = false;
      this.showUpcomingMeeting = false;
    },
    seeHistory() {
      this.showHistory = !this.showHistory;
      this.showUpcomingMeeting = false;
      this.showTeacherList = false;
      this.type = "history";
    },
    seeUpcomingMeeting() {
      this.showUpcomingMeeting = !this.showUpcomingMeeting;
      this.showTeacherList = false;
      this.showHistory = false;
      this.type = "upcoming";
    },
  },
};
</script>

<style scoped>
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
