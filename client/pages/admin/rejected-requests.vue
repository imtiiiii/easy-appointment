<template>
  <div>
    <div id="main-wrapper">
      <div style="margin: 100px 0px">
        <h5 style="text-align: center">Rejected Requests</h5>
        <div>
          <denied_requests></denied_requests>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import deniedRequestsVue from "../../components/adminDashboard/deniedRequests.vue";
export default {
  components: {
    denied_requests: deniedRequestsVue,
  },
};
</script>

<style></style>
