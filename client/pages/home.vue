<template>
  <div style="margin: 100px padding:100px 0px">
    <div v-if="user.user_type === 'admin'">
      <h3 style="margin: 100px 0px; text-align: center">Admin dashboard</h3>
      <admin-dashboard></admin-dashboard>
    </div>
    <div v-if="user.user_type === 'teacher'">
      <h1 style="margin: 100px 0px; text-align: center">Teacher Dashboard</h1>
      <teacher-dashboard></teacher-dashboard>
    </div>
    <div v-if="user.user_type === 'student'">
      <h3 style="margin: 100px 0px; text-align: center">Student dashboard</h3>
      <student-dashboard></student-dashboard>
    </div>
  </div>
</template>

<script>
import adminDashboard from "../components/adminDashboard/adminDashboard.vue";
import StudentDashboard from "../components/studentDashboard/studentDashboard.vue";
import TeacherDashboard from "../components/teacherDashboard/teacherDashboard.vue";

export default {
  components: { adminDashboard, TeacherDashboard, StudentDashboard },
  data() {
    return {
      user: null,
    };
  },
  created() {
    this.user = this.$store.state.authUser;
    if (!this.user) {
      this.$router.push('/login')
    }
  },
};
</script>

<style scoped></style>