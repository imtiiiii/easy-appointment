<template>
  <div>
    <div
      v-if="user.user_type === 'student'"
      class="_layout_col _only_desktop"
      style="margin: 50px 0px"
    >
      <!-- <div class="_menu_search_input">
            <input
              type="text"
              placeholder="search teacher"
              v-model="searchInput"
            />
          </div> -->
      <div class="search-container">
        <form class="search-form">
          <input type="text" class="search-input" placeholder="Search..." />
          <button type="submit" class="search-button">
            <i class="fas fa-search"></i>
          </button>
        </form>
      </div>
    </div>

    <div v-for="(teacher, index) of teachers" :key="index">
      <div class="card">
        <div class="card-row">
          <div class="card-label">Name:</div>
          <div class="card-value">
            {{ teacher.first_name + " " + teacher.last_name }}
          </div>
        </div>
        <div class="card-row">
          <div class="card-label">Email:</div>
          <div class="card-value">{{ teacher.email }}</div>
        </div>
        <div class="card-row">
          <div class="card-label">Department:</div>
          <div class="card-value">{{ teacher.dept ?? "N/A" }}</div>
        </div>
        <button href="#" class="card-button" v-on:click="timeSlot(teacher.id)">
          View Profile & Time Slots
        </button>
      </div>
    </div>
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
    searching: async function () {
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

<style scoped>
.search-container {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 0 auto;
}

.search-form {
  display: flex;
  align-items: center;
}

.search-input {
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  background-color: #f8f9fa;
  padding: 10px;
  width: 300px;
  border-radius: 20px 0px 0px 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
}

.search-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 0px 20px 20px 0px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.search-button:hover {
  background-color: #0062cc;
}
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
