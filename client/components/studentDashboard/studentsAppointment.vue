<template>
  <div
    style=" width: 80%; margin:100px auto;
			display: flex;
			justify-content: center;"
  >
  <div>
      
      <div v-if="appointments.length >0">
        <table style="width: 100%">
          <thead style="background-color: aliceblue">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Teacher</th>
              <th>Email</th>
              <th>Dept</th>
              <th>Agenda</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in appointments" :key="index">
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
                    item.byWhichTeacher.first_name +
                    " " +
                    item.byWhichTeacher.last_name
                  }}
                </button>
              </th>
              <th>{{ item.byWhichTeacher.email }}</th>
              <th>
                <!-- {{ item.byWhichTeacher.dept ? item.byWhichStudent.dept : "" }} -->cse
              </th>

              <th>{{ item.agenda }}</th>
              <th>
                <!-- acceptAppointment(item.id,index,1) here 1 means enum value of status accept -->
                <p v-if="item.status==='1' " >Accepted</p>
                <p v-else>Pending</p>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else style="">
        <h4 class="">Nothing to show</h4>
      </div>
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
    async created() {
        const res = await this.callApi(
        "get",
        `/appointments/student-appointment-history`
        );
        if (res?.status === 200 || res?.status === 201) {
            console.log('res',res)
            this.appointments =res.data
        }
        
    
  },
  watch: {
    chk() {},
    showAppointments() {},
  },
//   computed: {
//     chk() {
//       let now = moment().toString();
//       this.currentDate = now;
//       // console.log(this.currentDate);
//     },
//     async showAppointments() {
//       this.appointments = [];
//       const res = await this.callApi(
//         "get",
//         `/appointments?id=${this.$store.state.authUser.id}&type=${this.type}`
//       );
//       console.log(res);
//       if (res.status === 200 || res.status === 201) {
//         this.appointments = res.data;
//       }
//     },
//   },

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
