<template>
  <div style="margin: 100px 0px">
    <div
      style="width: 100%; display: flex; justify-content: center; margin: 100px"
    >
      <!-- <table>
        <tr>
          <th>Date</th>
          <th>Day</th>
          <th>Student</th>
          <th>Email</th>
          <th>Dept</th>

          <th>Agenda</th>
        </tr>
        <tr v-for="(item, index) in data" :key="index">
          <th>
            <p style="width: 100%">
              {{ formatDate(item.date) }}
            </p>
          </th>
          <th>{{ item.forWhichTimeSlot.day.day_name }}</th>
          <th>
            <button id="link">
              {{
                item.byWhichStudent.first_name +
                " " +
                item.byWhichStudent.last_name
              }}
            </button>
          </th>
          <th>{{ item.byWhichStudent.email }}</th>
          <th>
            {{ item.byWhichStudent.dept ? item.byWhichStudent.dept : "" }}
          </th>

          <th>{{ item.agenda }}</th>
        </tr>
      </table> -->
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment().format();
export default {
 
  data() {
    return {
      user: this.$route.params.id,
      data: [],
    };
  },
  async mounted() {
    console.log("jar na kne");
    const data = await this.callApi(
      "get",
      `/appointments/accepted?id=${this.user}`
    );
    if (data.status === 200) {
      this.data = data.data;
    }
  },
  methods: {
    jumpToProfile(id) {
      this.$router.push(`/profile/${id}`);
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
  },
};
</script>

<style></style>