<template>
  <div style="margin: 100px padding:100px 0px"></div>
</template>

<script>
import adminDashboard from "../components/adminDashboard/adminDashboard.vue";
import StudentDashboard from "../components/studentDashboard/studentDashboard.vue";
import TeacherDashboard from "../components/teacherDashboard/teacherDashboard.vue";

export default {
 
  components: { adminDashboard, TeacherDashboard, StudentDashboard },
  data() {
    return {
      user: null
    };
  },
  async mounted() {
    this.user = this.$store.state.authUser;
    this.$router.push("/home");
  }
};
</script>

<style scoped></style>
