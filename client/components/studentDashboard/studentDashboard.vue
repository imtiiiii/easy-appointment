<template>
  <div>
    <!-- ALL BUTTONS -->
    <div style="width:50%; margin:50px auto">
      <Row :gutter="25" style="width:100%">
        <Col span="12">
          <Button style="width:100%" type="primary">History</Button>
        </Col>
        <Col span="12">
          <Button style="width:100%" type="primary">
            <NuxtLink to="/teacher/appointmnet-requests"
              ><span class="text-white">Near appointments</span></NuxtLink
            >
          </Button>
        </Col>
        <Col style="margin:10px auto;" span="24">
          <Button @click="showTeacherList=true" style="width:100%" type="primary">
            
              <span class="text-white">Book Appointment</span>
            
          </Button>
        </Col>
      </Row>
    </div>
    <div v-if="showTeacherList">
      <teacher-list></teacher-list>
    </div>
    <div v-if="showHistory">
      <students-appointment v-bind:type="type"></students-appointment>
    </div>
    <div v-if="showUpcomingMeeting">
      <students-appointment v-bind:type="type"></students-appointment>
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

<style>
.dashboard-menu {
  display: grid;
  grid-template: 150px / auto auto auto auto;
  column-gap: 50px;
}
</style>
