<template>
  <div>
    <div v-if="user.user_type === 'admin'">
      <h2
        style=" margin-bottom:10em ; text-align: center;"
      >
        Admin Dashboard
      </h2>
      <admin-dashboard></admin-dashboard>
    </div>
    <div style="margin:0 auto" v-if="user.user_type === 'teacher'">
      <h2
        style=" margin-bottom:10em ; text-align: center;"
      >
        Teacher Dashboard
      </h2>
      <teacher-dashboard></teacher-dashboard>
    </div>
    <div v-if="user.user_type === 'student'">
      <h1
        style="margin: 100px 0px; text-align: center;text-decoration:underline"
      >
        Student Dashboard
      </h1>
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
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped></style>
