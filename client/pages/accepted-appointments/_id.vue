<template>
  <div style="margin: 100px 0px">
    <div
      style="
			width: 80%;
             margin:100px auto
			display: flex;
			justify-content: center;
		"
    >
      <h5 style="text-align: center; margin: 20px">Your appointments</h5>

      <div v-if="data.length">
        <table style="width: 100%">
          <thead style="background-color: aliceblue">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Student</th>
              <th>Email</th>
              <th>Dept</th>
              <th>Agenda</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="index">
              <th style="padding: 0px 40px">
                {{ formatDate(item.date) }}
              </th>
              <th>
                {{ item.forWhichTimeSlot.start_time }} -
                {{ item.forWhichTimeSlot.end_time }}
              </th>
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
          </tbody>
        </table>
      </div>
      <div v-else style="">
        <h6 style="text-align: center">No upcoming appointment Request</h6>
      </div>
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
    const req = await this.callApi("get", `/appointments/accepted`);

    if (req?.status === 200) {
      this.data = req.data;
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
