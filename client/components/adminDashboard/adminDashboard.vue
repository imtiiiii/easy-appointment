
<template>
  <div class="teacher-dashboard">
    <div class="dashboard-card">
      <div class="card-header">All users</div>
      <div class="card-body">{{ allUsersCount }}</div>
    </div>
    <div class="dashboard-card">
      <div class="card-header">Teachers</div>
      <div class="card-body">{{ teachersCount }}</div>
    </div>
    <div class="dashboard-card">
      <div class="card-header">Students</div>
      <div class="card-body">{{ studentsCount }}</div>
    </div>
    <div class="dashboard-card">
      <div class="card-header">Join requests</div>
      <div class="card-body">{{ joinRequests }}</div>
    </div>
  </div>
</template>

<script>
import Register from "../register.vue";
import pendingRequestVue from "../adminDashboard/pendingRequest.vue";
import StudentList from "../adminDashboard/studentList.vue";
import TeacherList from "../adminDashboard/teacherList.vue";
export default {
  components: {
    "pending-request": pendingRequestVue,
    StudentList,
    TeacherList,
    Register,
  },
  data() {
    return {
      pendingReq: false,
      teacherList: false,
      studentList: false,
      addUser: false,
      allUsersCount: 0,
      teachersCount: 0,
      studentsCount: 0,
      joinRequests: 0,
    };
  },
  async created() {
    const { data } = await this.callApi("get", "/dashboard/");
    console.log("🚀 ~ file: adminDashboard.vue:74 ~ created ~ req", data);
    this.allUsersCount = data.allUsersCount.total_users;
    this.teachersCount = data.teacherCount.total_teachers;
    this.studentsCount = data.studentCount.total_students;
    this.joinRequests = data.pendingRequestCount.total_pending_requests;
  },
  methods: {
    seePendingReq() {
      this.pendingReq = !this.pendingReq;
      this.teacherList = false;
      this.studentList = false;
      this.addUser = false;
    },
    seeTeacherList() {
      this.pendingReq = false;
      this.teacherList = !this.teacherList;
      this.studentList = false;
      this.addUser = false;
    },
    seeStudentList() {
      this.pendingReq = false;
      this.teacherList = false;
      this.studentList = !this.studentList;
      this.addUser = false;
    },
    addUsers() {
      this.pendingReq = false;
      this.teacherList = false;
      this.studentList = false;
      this.addUser = !this.addUser;
    },
  },
};
</script>

<style scoped>
.teacher-dashboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.dashboard-card {
  width: 23%;
  margin-bottom: 2%;
  background-color: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;
}
.dashboard-card:hover {
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
}

.card-header {
  background-color: #f5f5f5;
  padding: 1rem;
  font-weight: bold;
}

.card-body {
  padding: 1rem;
  font-size: 2rem;
  text-align: center;
}
</style>
