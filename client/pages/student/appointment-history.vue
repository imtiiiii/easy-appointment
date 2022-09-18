<template>
  <div>
    <div id="main-wrapper">
      <div style="margin: 100px 0px">
        <h2 style="text-align:center; text-decoration:underline">
          Appointments history
        </h2>
        <div>
          <history type="history"></history>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import studentsAppointmentVue from "../../components/studentDashboard/studentsAppointment.vue";

export default {
  components: {
    history: studentsAppointmentVue,
  },
};
</script>

<style></style>