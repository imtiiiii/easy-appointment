<template>
  <div>
    <div id="main-wrapper">
      <div style="margin: 100px 0px">
        <h2 style="text-align:center; text-decoration:underline">See Your Appointment Requests</h2>
        <div>
            <requests></requests>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import upcommingAppoinmentsVue from '../../components/teacherDashboard/upcommingAppoinments.vue';
export default {
    components:{
        "requests":upcommingAppoinmentsVue
    },
};
</script>

<style></style>
