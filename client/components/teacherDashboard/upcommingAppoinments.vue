<template>
  <div
    style="
			width: 80%;
             margin:100px auto
			display: flex;
			justify-content: center;
		"
  >
    <div>
      <div v-if="upComingAppointments.length > 0">
        <table style="width: 100%">
          <thead style="background-color: aliceblue">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Student</th>
              <th>Email</th>
              <th>Dept</th>
              <th>Agenda</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in upComingAppointments" :key="index">
              <th style="padding: 0px 40px">
                <h6 style="width: 100%">
                  {{ formatDate(item.date) }}
                </h6>
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
              <th>
                <!-- acceptAppointment(item.id,index,1) here 1 means enum value of status accept -->
                <Button
                  type="primary"
                  v-on:click="changeStatus(item.id, index, '1')"
                  >Accept</Button
                >
                <!-- acceptAppointment(item.id,index,1) here 2 means enum value of status rejection -->
                <Button
                  type="error"
                  v-on:click="changeStatus(item.id, index, '2')"
                  >Reject</Button
                >
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <h4 style="text-align: center">No up coming appointments request to show</h4>
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
      upComingAppointments: [],
    };
  },
  async mounted() {
    const res = await this.callApi("get", "/appointments/upComingAppointments");
    console.log("res is ", res);
    if (res.status === 200 || res.status === 201) {
      this.upComingAppointments = res.data;
    }
  },
  methods: {
    async changeStatus(itemId, index, status) {
      console.log("app", this.upComingAppointments[index]);

      const data = await this.callApi("post", "/appointments/status", {
        request_id: itemId,
        status: status,
      });
      if (data?.status === 200 || data?.status === 201) {
        const messageBody =
          status == "1" ? "Appointment Accepted" : "Appointment Rejected";
        this.i(messageBody);
        this.upComingAppointments.splice(index, 1);
      }
    },
    jumpToProfile(profileId) {
      this.$router.push(`profile/${profileId}`);
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
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
</style>
