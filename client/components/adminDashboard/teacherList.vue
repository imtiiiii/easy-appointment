<template>
  <div>
    <div
      v-if="user.user_type === 'student'"
      class="_layout_col _only_desktop"
      style="margin: 50px 0px"
    >
      <div class="_menu_search">
        <div class="_menu_search_main">
          <div class="_menu_search_icon">
            <i class="fas fa-search"></i>
          </div>

          <div class="_menu_search_input">
            <input
              type="text"
              placeholder="Teacher Name"
              v-model="searchInput"
            />
          </div>
        </div>
      </div>
    </div>
    <Row style="width:80%;margin:0 auto" :gutter="50" justify="start">
      <div v-for="(teacher, index) of teachers" :key="index">
        <Col style="margin:20px 0px" span="24">
          <div
            style="background-color: rgb(211 214 218);padding: 30px;border-radius: 10px;"
          >
            <h4>Name: {{ teacher.first_name + " " + teacher.last_name }}</h4>
            <hr />
            <h4>Email:{{ teacher.email }}</h4>
            <hr />

            <h4>Department:{{ teacher.dept }}</h4>
            <hr />

            <div>
              <Button
                v-if="user.user_type == 'student'"
                v-on:click="timeSlot(teacher.id)"
                type="success"
              >
                See time slots
              </Button>
            </div>
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
      teachers: [],
      user: null,
      searchInput: "",
    };
  },
  async created() {
    this.user = this.$store.state.authUser;
  },

  methods: {
    async erase(id, index) {
      console.log("erase called =", id);
      this.isLoading = true;
      const dlt = await this.callApi("delete", "/auth/delete", {
        id,
      });

      this.isLoading = false;
      if (dlt.status !== 200) {
        this.e("Something went wrong.Try again");
      } else {
        this.teachers.splice(index, 1);
        this.s("Successfull");
      }
    },
    update(id) {
      this.$router.push(`/profile/${id}`);
    },
    timeSlot(id) {
      this.$router.push(`/time-slots/${id}`);
    },
  },
  watch: {
    async searching() {},
  },
  computed: {
    searching: async function() {
      // console.log("searching for something", this.searchInput);
      if (this.searchInput === "") {
        const teachers = await this.callApi("get", "/dashboard/teacher-list/");
        if (teachers.status === 200) {
          this.teachers = teachers.data;
          // console.log(this.teachers);
        }
      } else {
        this.teachers = [];
        const teachers = await this.callApi(
          "get",
          `/dashboard/teacher-list/search?value=${this.searchInput}`
        );
        this.teachers = teachers.data;
        // console.log("im from search", teachers.data);
      }
    },
  },
};
</script>

<style></style>
