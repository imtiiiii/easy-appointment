<template>
  <div>
    <div id="main-wrapper">
      <div>
        <h5 style="text-align:center;">
          Join Requests
        </h5>
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
