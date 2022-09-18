<template>
  <div>
    <div id="main-wrapper">
      <div style="margin: 100px 0px">
        <h2 style="text-align:center; text-decoration:underline">
          Up-coming Appointments
        </h2>
        <div>
          <upcoming_appointments type="upcoming"></upcoming_appointments>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import studentsAppointmentVue from "../../components/studentDashboard/studentsAppointment.vue";

export default {
  components: {
    upcoming_appointments: studentsAppointmentVue,
  },
};
</script>

<style></style>