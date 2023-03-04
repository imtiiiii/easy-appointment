<template>
  <div style="margin: 20px 20px">
    <div class="profile-container">
      <h1>Profile Details</h1>
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

    <!-- <h2 style="margin: 60px 10px; padding: 10px 5px">Profile Details</h2>
		<hr />
		<div>
			<h4 style="margin: 20px 10px">
				First Name: {{ userDetails.first_name }}
			</h4>
			<h4 style="margin: 20px 10px">
				Last Name: {{ userDetails.last_name }}
			</h4>
			<h4 style="margin: 20px 10px">Email: {{ userDetails.email }}</h4>
			<h4 style="margin: 20px 10px">Type: {{ userDetails.user_type }}</h4>
			<h4
				style="margin: 20px 10px"
				v-if="
					userDetails.user_type === 'teacher' ||
					userDetails.user_type === 'student'
				"
			>
				Deptertment: {{ userDetails.dept }}
			</h4>
			<h4 style="margin: 20px 10px" v-if="userDetails.course">
				Course: {{ userDetails.course }}
			</h4>
			<h4 style="margin: 20px 10px" v-if="userDetails.student_id">
				Student Id: {{ userDetails.student_id }}
			</h4>
		</div> -->
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
