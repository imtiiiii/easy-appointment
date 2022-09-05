<template>
  <div class="created-slot-partent">
    <div class="heading">
      <h2 style="text-align: center; color: #2c92f8">Created Slots</h2>
    </div>
    <div class="main-content" v-if="createdSlots.length">
      <table>
        <tr>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Options</th>
        </tr>
        <tr v-for="(item, index) in createdSlots" :key="index">
          <td v-if="editFor !== item.id">
            {{ timeConvert(item.start_time) }}
          </td>

          <td v-if="editFor !== item.id">
            {{ timeConvert(item.end_time) }}
          </td>

          <td style="width: 100%">
            <button
              style="background-color: #ff0000; padding: 10px 20px"
              v-on:click="deleteSlot(item.id, index)"
            >
              Delete
            </button>
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      <h4>No data yet...</h4>
    </div>
    <hr />
    <Select placeholder="Select Day" size="large" v-model="day">
      <Option value="0">sunday</Option>
      <Option value="1">monday</Option>
      <Option value="2">tuesday</Option>
      <Option value="3">wednesday</Option>
      <Option value="4">thursday</Option>
      <Option value="5">friday</Option>
      <Option value="6">saturday</Option>
    </Select>
    <!-- {{day}} -->
    <!-- {{this.$store.state.authUser.id}} -->
  </div>
</template>
<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import "vue2-timepicker/dist/VueTimepicker.css";
import moment from "moment";
export default {
  components: {
    "vue-timepicker": VueTimepicker,
  },
  data() {
    return {
      day: "",
      startTime: "",
      endTime: "",
      createdSlots: [],
      editFor: -1,
      convertedStartTime: null,
      convertedEndTime: null,
    };
  },
  async created() {
    try {
    } catch (error) {
      this.e("Something is wrong to fetch your created slots data");
    }
  },
  watch: {
    async day(newValue, oldValue) {
      const { data } = await this.callApi("post", "/time-slots/created", {
        day: newValue,
      });
      console.log("data is ", data);
      this.createdSlots = data;
    },
  },
  methods: {
    async deleteSlot(slotId, index) {
      const resData = await this.callApi(
        "delete",
        `/time-slots/delete/?slotId=${slotId}`
      );
      this.s("Slot is deleted successfully");
      this.createdSlots.splice(index, 1);
    },
    edit(slotId) {
      if (slotId === this.editFor) {
        this.editFor = -1;
      } else {
        this.editFor = slotId;
      }
    },
    async update(slotId) {
      const reqData = {
        dayId: this.day,
        slotId: slotId,
        newStartTime: this.startTime + ":00",
        newEndTime: this.endTime + ":00",
      };
      try {
        await this.$axios.$put("/time-slots/update", reqData);
        this.s("Updated Successfully");
        this.startTime = "";
        this.endTime = "";
      } catch (error) {
        this.e("Slot conflicting");
      }
    },
  },
};
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  column-gap: 40px;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 25px;
  column-gap: 40px;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
.created-slot-partent {
  /* margin: 100px 0px; */

  padding: 30px 10px;
}
.main-content {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
