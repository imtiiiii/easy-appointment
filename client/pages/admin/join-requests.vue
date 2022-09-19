<template>
  <div>
    <div id="main-wrapper">
      <div style="margin: 100px 0px">
        <h2 style="text-align:center; text-decoration:underline">
          Join Requests
        </h2>
        <div>
          <pending_requests></pending_requests>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pendingRequestVue from "../../components/adminDashboard/pendingRequest.vue";
export default {
  components: {
    pending_requests: pendingRequestVue,
  },
};
</script>

<style></style>
