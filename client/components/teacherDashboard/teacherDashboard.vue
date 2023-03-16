<template>
  <div class="teacher-dashboard">
    <div class="dashboard-card">
      <div class="card-header">Today's Appointment</div>
      <div class="card-body">{{ todaysAppointments }}</div>
    </div>
    <div class="dashboard-card">
      <div class="card-header">Up coming appointments</div>
      <div class="card-body">{{ upComingAppointments }}</div>
    </div>
    <div class="dashboard-card">
      <div class="card-header">Appointment Requests</div>
      <div class="card-body">{{ appointmentRequests }}</div>
    </div>
    <div class="dashboard-card">
      <div class="card-header">Meetings Count</div>
      <div class="card-body">{{ totalMeeting }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todaysAppointments: 0,
      appointmentRequests: 0,
      upComingAppointments: 0,
      totalMeeting: 0,
    };
  },
  async created() {
    this.user = this.$store.state.authUser;
    const { data } = await this.callApi("get", "/dashboard/teacher");

    this.todaysAppointments =
      data.todaysAppointmentsCount.todays_appointments_count;
    this.appointmentRequests =
      data.pendingAppointmentsCount.pending_appointments_count;
    this.upComingAppointments =
      data.upComingAppointmentsCount.up_coming_appointments_count;
    this.totalMeeting = data.totalMeetings.total_meetings;
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
