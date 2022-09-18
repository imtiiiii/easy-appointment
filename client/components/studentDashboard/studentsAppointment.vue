<template>
  <div
    style="
			width: 80%;
      margin:100px auto
			display: flex;
			justify-content: center;
			
      
		"
  >
  <div v-if="appointments.length>0">
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
        <th style="padding: 0px 40px">
          <h6 style="width: 100%">
            {{ formatDate(item.date) }}
          </h6>
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
      appointments: [],
    };
  },
  watch: {
    chk() {},
    showAppointments() {},
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
    },
  },

  methods: {
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    showStatus(status) {
      if (status == 1) {
        return "Accepted";
      } else if (status == 0) return "Pending";
      else return "Rejected";
    },
  },
};
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  padding: 100px;
}

th {
  border: 1px solid black;
  padding: 20px 30px;
  
}
td {
  padding: 20px 30px;
 
}

tr:nth-child(even) {
  background-color: #dddddd;
}
button#link {
  background: none !important;
  border: none;
  padding: 0 !important;
  /*optional*/
  font-family: arial, sans-serif;
  /*input has OS specific font-family*/
  color: #069;
  text-decoration: underline;
  cursor: pointer;
}
