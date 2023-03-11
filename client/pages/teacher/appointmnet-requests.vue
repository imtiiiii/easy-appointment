<template>
  <div>
    <div id="main-wrapper">
     
        <h2 style="text-align:center;">See Your Appointment Requests</h2>
        <div>
            <requests></requests>
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
