<template>
  <div>
    <div style="text-align: center">
      <h2>Welcome to your {{ type }} appointment</h2>
    </div>

    <div
      v-if="appointments.length !== 0"
      style="
				
				width: 100%;
			display: flex;
			justify-content: center;
			margin: 100px;
				
				
			"
    >
      <table>
        <tr>
          <th>Date</th>
          <th>Day</th>
          <th>Teacher</th>
          <th>Email</th>
          <th>Dept</th>
          <th>Agenda</th>
          <th>Status</th>
        </tr>
        <tr v-for="(item, index) in appointments" :key="index">
          <th>
            <p style="width: 100%">
              {{ formatDate(item.date) }}
            </p>
          </th>
          <th>{{ item.forWhichTimeSlot.day.day_name }}</th>
          <th>
            <button id="link">
              {{
                item.byWhichTeacher.first_name +
                  " " +
                  item.byWhichTeacher.last_name
              }}
            </button>
          </th>
          <th>{{ item.byWhichTeacher.email }}</th>
          <th>
            {{ item.byWhichTeacher.dept ? item.byWhichTeacher.dept : "" }}
          </th>

          <th>{{ item.agenda }}</th>
          <th>{{ showStatus(item.status) }}</th>
        </tr>
      </table>
    </div>
    <div v-else>
      <h3>Nothing to show</h3>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment().format();
export default {
  props: ["type"],
  data() {
    return {
      currentDate: null,
      appointments: []
    };
  },
  watch: {
    chk() {},
    showAppointments() {}
  },
  computed: {
    chk() {
      let now = moment().toString();
      this.currentDate = now;
      // console.log(this.currentDate);
    },
    async showAppointments() {
      this.appointments = [];
      const res = await this.callApi(
        "get",
        `/appointments?id=${this.$store.state.authUser.id}&type=${this.type}`
      );
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        this.appointments = res.data;
      }
    }
  },

  methods: {
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    showStatus(status) {
      if (status == 1) {
        return "Accepted";
      } else if(status==0) return "Pending";
	  else return "Rejected"
    }
  }
};
</script>

<style scoped>
.slot {
  text-align: center;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  /* grid-row-gap: 100px; */
  grid-column-gap: 60px;
  margin: 10px 0px 100px 0px;
  padding: 30px 0px;
}
</style>