<template>
  <div>
    <div>
      <profile-details v-bind:userId="this.$route.params.id"></profile-details>
    </div>
    <div
      v-if="
        $store.state.authUser.user_type === 'admin' ||
        $store.state.authUser.id === userId
      "
    >
      <!-- <hr style="width: 50%; margin:0 auto" /> -->
      <edit-profile v-bind:userId="userId"></edit-profile>
    </div>
  </div>
</template>

<script>
import profileDetails from "../../components/profileDetails.vue";
export default {
  components: {
    "profile-details": profileDetails,
  },
  data() {
    return {
      userId: null,
      editProfile: false,
    };
  },
  async created() {
    this.userId = this.$route.params.id;
    this.userId = parseInt(this.userId);
  },
};
</script>
