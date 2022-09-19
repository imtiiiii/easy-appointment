<template>
  <div>
    
    <Row style="width:80%;margin:0 auto" :gutter="50" justify="start">
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
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: null,
    };
  },
  async created() {
    const students = await this.callApi("get", "/dashboard/student-list/");
    if (students.status === 200) {
      this.students = students.data;
      // console.log(this.students);
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
    update(id) {
      this.$router.push(`/profile/${id}`);
    },
  },
};
</script>

<style></style>
