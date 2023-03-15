
<template>
  <div style="margin: 20px 20px">
    <!-- <Row style="width:80%;margin:0 auto" :gutter="50" justify="start">
      <div v-for="(student, index) of students" :key="index">
        <Col style="margin:20px 0px" span="24">
          <div
            style="background-color: rgb(211 214 218);padding: 30px;border-radius: 10px;"
          >
            <h4>Name: {{ student.first_name + " " + student.last_name }}</h4>
            <hr />
            <h4>Email:{{ student.email }}</h4>
            <hr />

            <h4>Department:{{ student.dept }}</h4>
            <hr />
            <h4>Id:{{ student.student_id }}</h4>
          </div>
        </Col>
      </div>
    </Row> -->
    <div v-for="(student, index) of students" :key="index">
      <div class="card">
        <div class="card-row">
          <div class="card-label">Name:</div>
          <div class="card-value">
            {{ student.first_name + " " + student.last_name }}
          </div>
        </div>
        <div class="card-row">
          <div class="card-label">Email:</div>
          <div class="card-value">{{ student.email }}</div>
        </div>
        <div class="card-row">
          <div class="card-label">Department:</div>
          <div class="card-value">{{ student.dept ?? "N/A" }}</div>
        </div>
        <div class="card-row">
          <div class="card-label">Student id:</div>
          <div class="card-value">{{ student.student_id ?? "N/A" }}</div>
        </div>
        <button href="#" class="card-button" v-on:click="goToProfile(student.id)">
          View Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [],
    };
  },
  async created() {
    const students = await this.callApi("get", "/dashboard/student-list/");
    console.log("🚀 ~ file: studentList.vue:58 ~ students:", students.data)
    if (students?.status === 200) {
      this.students = students.data;
    }
  },
  methods: {
    async erase(id, index) {
      const dlt = await this.callApi("delete", "/auth/delete", {
        id,
      });
      if (dlt.status !== 200) {
        this.e("Something went wrong.Try again");
      } else {
        this.students.splice(index, 1);
        this.s("Successfull");
      }
      },
    async goToProfile(id) {
      this.$router.push(`/profile/${id}`);
    },
    update(id) {
      this.$router.push(`/profile/${id}`);
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 50%;
  margin: 20px auto;
}

.card-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.card-label {
  flex: 1;
  font-weight: bold;
}

.card-value {
  flex: 2;
}

.card-button {
  display: block;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.card-button:hover {
  background-color: #0062cc;
}
</style>
