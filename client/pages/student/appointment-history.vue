<template>
  <div>
    <div id="main-wrapper">
      <div>
        <h6 style="text-align: center">Appointments history</h6>
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
