<template>
  <div style="margin: 20px 20px">
    <div class="profile-container">
      <h5 style="margin: 0px 0 20px 0">Profile Details</h5>
      <div class="profile-info">
        <div class="profile-row">
          <div class="profile-label">First Name:</div>
          <div class="profile-value">{{ userDetails.first_name }}</div>
        </div>
        <div class="profile-row">
          <div class="profile-label">Last Name:</div>
          <div class="profile-value">{{ userDetails.last_name }}</div>
        </div>
        <div class="profile-row">
          <div class="profile-label">Email:</div>
          <div class="profile-value">{{ userDetails.email }}</div>
        </div>
        <div class="profile-row">
          <div class="profile-label">Department:</div>
          <div class="profile-value">{{ userDetails.dept }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["userId"],
  data() {
    return {
      userDetails: {},
    };
  },
  async created() {
    const { data } = await this.callApi("get", `/profile/${this.userId}`);
    this.userDetails = data;
    // console.log(this.userDetails);
  },
};
</script>

<style scoped>
.profile-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
}

h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.profile-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.profile-label {
  flex: 1;
  font-weight: bold;
}

.profile-value {
  flex: 2;
}
</style>
