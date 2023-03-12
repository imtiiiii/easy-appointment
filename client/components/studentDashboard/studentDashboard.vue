<template>
  <div>
    <!-- ALL BUTTONS -->
    <!-- <div style="width:50%; margin:50px auto">
      <Row :gutter="25" style="width:100%">
        <Col span="12">
          <Button style="width:100%" type="primary">
            <NuxtLink to="/student/appointment-history"
              ><span class="text-white">Appointments history</span></NuxtLink
            >
          </Button>
        </Col>
        <Col span="12">
          <Button style="width:100%" type="primary">
            <NuxtLink to="/student/upcoming-appointments"
              ><span class="text-white">Near appointments</span></NuxtLink
            >
          </Button>
        </Col>
        <Col style="margin:10px auto;" span="24">
          <Button
            @click="showTeacherList = true"
            style="width:100%"
            type="primary"
          >
            <span class="text-white">Book Appointment</span>
          </Button>
        </Col>
      </Row>
    </div> -->
    <!-- <div v-if="showTeacherList">
      <teacher-list></teacher-list>
    </div> -->
    <div
      v-if="$store.state.authUser.user_type === 'student'"
      class="container_admin"
    >
      <div class="container_child">
        <h3>All appointments : {{ allUsersCount ?? 0 }}</h3>
      </div>
      <div class="container_child">
        <h3>Today's appointments : {{ teachersCount ?? 0 }}</h3>
      </div>
      <div class="container_child">
        <h3>Pending appointments : {{ studentsCount ?? 0 }}</h3>
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
    };
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
