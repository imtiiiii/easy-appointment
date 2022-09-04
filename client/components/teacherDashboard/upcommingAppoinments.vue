<template>
  <div
    style="
			width: 100%;
			display: flex;
			justify-content: center;
			margin: 100px;
		"
  >
    <div>
      <div v-if="upCommingAppoinments.length > 0">
        <table>
          <tr>
            <th>Date</th>
            <th>Day</th>
            <th>Student</th>
            <th>Email</th>
            <th>Dept</th>

            <th>Agenda</th>
            <th>Options</th>
          </tr>
          <tr v-for="(item, index) in upCommingAppoinments" :key="index">
            <th style="padding: 0px 40px">
              <h6 style="width: 100%">
                {{ formatDate(item.date) }}
              </h6>
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
            <th>
              <!-- acceptAppointment(item.id,index,1) here 1 means enum value of status accept -->
              <Button type="primary" v-on:click="changeStatus(item.id, index, '1')"
                >Accept</Button
              >
              <!-- acceptAppointment(item.id,index,1) here 2 means enum value of status rejection -->
              <Button type="error" v-on:click="changeStatus(item.id, index, '2')"
                >Reject</Button
              >
            </th>
          </tr>
        </table>
      </div>
      <div v-else style="">
        <h4 class="">No Upcomming Appoinments Request</h4>
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
      upCommingAppoinments: []
    };
  },
  async created() {
    const res = await this.callApi("get", "/appointments/upCommingAppoinments");
    console.log("res is ", res);
    if (res.status === 200 || res.status === 201) {
      this.upCommingAppoinments = res.data;
    }
  },
  methods: {
    async changeStatus(itemId, index, status) {
      try {
        const data = await this.callApi("put", "/appointments/status", {
          appointment_id: itemId,
          status: status
        });
        this.upCommingAppoinments.splice(index, 1);
        const messageBody =
          status == "1" ? "Appointment Accepted" : "Appointment Rejected";
        this.i(messageBody);
      } catch (error) {
        this.swr();
      }
    },
    jumpToProfile(profileId) {
      this.$router.push(`profile/${profileId}`);
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    }
  }
};
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  padding: 100px;
}

th {
  border: 3px solid #8ef2b3;
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