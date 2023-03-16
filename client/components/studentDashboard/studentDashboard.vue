<template>
  <!-- <div>
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
        <h3>Pending appointment requests : {{ pendingRequests ?? 0 }}</h3>
      </div>
      <div class="container_child">
        <h3>Meetings : {{ totalMeeting ?? 0 }}</h3>
      </div>
    </div>
  </div> -->
  <div
    v-if="$store.state.authUser.user_type === 'student'"
    class="teacher-dashboard"
  >
    <div class="dashboard-card">
      <div class="card-header">All appointments</div>
      <div class="card-body">{{ appointmentRequests }}</div>
    </div>
    <div class="dashboard-card">
      <div class="card-header">Pending appointment requests</div>
      <div class="card-body">{{ pendingRequests }}</div>
    </div>

    <div class="dashboard-card">
      <div class="card-header">Meetings Count</div>
      <div class="card-body">{{ totalMeeting }}</div>
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
      totalMeeting: 0,
    };
  },
  async created() {
    const { data } = await this.callApi("get", "/dashboard/student");
    this.todaysAppointments =
      data.todaysAppointmentsCount.todays_appointments_count;
    this.appointmentRequests = data.allAppointmentsCount.all_appointments_count;
    this.pendingRequests =
      data.pendingAppointmentsCount.pending_appointments_count;
    this.totalMeeting = data.totalMeetings.total_meetings;
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
.teacher-dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.dashboard-card {
  width: 23%;
  margin-bottom: 2%;
  background-color: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;
}
.dashboard-card:hover {
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
}

.card-header {
  background-color: #f5f5f5;
  padding: 1rem;
  font-weight: bold;
}

.card-body {
  padding: 1rem;
  font-size: 2rem;
  text-align: center;
}
</style>
