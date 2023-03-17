<template>
  <div>
    <div class="parent" style="margin: 20px 20px">
      <div class="editProfile">
        <h5 style="text-align: left; margin: 0px 0 20px 0">
          Edit Profile Page
        </h5>
        <div class="_log_input_group">
          <Label>First Name:</Label>
          <Input
            placeholder="First Name"
            size="large"
            type="text"
            v-model="userInfo.first_name"
          ></Input>
        </div>
        <div class="_log_input_group">
          <Label>Last Name:</Label>
          <Input
            placeholder="Last Name"
            size="large"
            type="text"
            v-model="userInfo.last_name"
          ></Input>
        </div>
        <div
          class="_log_input_group"
          v-if="
            $store.state.authUser.user_type === 'teacher' ||
            $store.state.authUser.user_type === 'student'
          "
        >
          <Label>Depertment:</Label>
          <Input
            v-model="userInfo.dept"
            placeholder="Depertment"
            size="large"
            type="text"
          ></Input>
        </div>
        <div
          class="_log_input_group"
          v-if="$store.state.authUser.user_type === 'teacher'"
        >
          <Label>Course Name:</Label>
          <Input
            v-model="userInfo.course"
            placeholder="Course"
            size="large"
            type="text"
          ></Input>
        </div>
        <div
          class="_log_input_group"
          v-if="$store.state.authUser.user_type === 'student'"
        >
          <Label>Student ID:</Label>
          <Input
            v-model="userInfo.student_id"
            placeholder="Student ID"
            size="large"
            type="text"
          ></Input>
        </div>
        <div
          class="_log_input_group"
          v-if="this.$store.state.authUser.user_type === 'admin'"
        >
          <Label>User Status:</Label>
          <Input
            v-model="userInfo.status"
            placeholder="status"
            size="large"
            type="text"
          ></Input>
        </div>

        <div class="_log_button">
          <Button
            v-on:click="updateUser"
            type="success"
            size="large"
            long
            :loading="isLoading"
            :disabled="isLoading"
            >{{ isLoading ? "Please wait..." : "Update" }}</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  props: ["userId"],
  data() {
    return {
      // userInfo:this.$store.state.authUser,
        userInfo: {},
        isLoading: false,
    };
  },
  async created() {
    // console.log("edit profile props=", this.userId);
    const user = await this.callApi("get", `profile/${this.userId}`);
    // console.log("user=", user);
    if (user.status === 200) {
      this.userInfo = user.data;
      // console.log("user info ", this.userInfo);
    }
  },
  methods: {
    async updateUser() {
      this.isLoading = true;
      try {
        const resData = await this.callApi(
          "put",
          "/profile/update",
          this.userInfo
        );
        this.isLoading = false;
        if (resData.status === 200) {
          this.s("Profile updated successfully");
        }
      } catch (error) {
        this.isLoading = false;
        this.swr();
      }
    },
  },
};
</script>
<style scoped>
.editProfile {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
}
</style>
