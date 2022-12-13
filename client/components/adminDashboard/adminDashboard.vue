<!-- <template>
	<div>
		<div class="dashboard-menu">
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
				v-on:click="$router.push('/admin/join-requests')"
			>
				Pending Requests
			</button>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
				v-on:click="seeStudentList()"
			>
				Student's list
			</button>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
				v-on:click="seeTeacherList()"
			>
				Teacher's list
			</button>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
				v-on:click="addUsers()"
			>
				Add user
			</button>
		</div>
		<div v-if="pendingReq === true">
			<pending-request></pending-request>
		</div>
		<div v-if="studentList === true">
			<student-list></student-list>
		</div>
		<div v-if="teacherList === true">
			<teacher-list></teacher-list>
		</div>
		<div v-if="addUser === true">
			<register></register>
		</div>
	</div>
</template> -->

<template>
  <div class="container_admin">
    <div class="container_child">
      <h3>All users: {{ allUsersCount }}</h3>
    </div>
    <div class="container_child">
      <h3>Teachers: {{ teachersCount }}</h3>
    </div>
    <div class="container_child">
      <h3>Students: {{ studentsCount }}</h3>
    </div>
    <div class="container_child">
      <h3>Join requests: {{ joinRequests }}</h3>
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
.container_admin {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}
.container_child {
  width: 20%;
  height: 100px;
  background-color: #f1f1f1;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
