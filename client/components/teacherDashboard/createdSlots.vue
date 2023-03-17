<template>
  <div class="created-slot-partent">
    <Select placeholder="Select Day" size="large" v-model="day">
      <Option value="0">sunday</Option>
      <Option value="1">monday</Option>
      <Option value="2">tuesday</Option>
      <Option value="3">wednesday</Option>
      <Option value="4">thursday</Option>
      <Option value="5">friday</Option>
      <Option value="6">saturday</Option>
    </Select>
    <hr />
    <div v-if="createdSlots.length">
      <table>
        <thead style="background-color: aliceblue">
          <tr >
            <th style="width:50%"  >Start Time</th>
            <th  style="width:50%">End Time</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in createdSlots" :key="index">
            <th  v-if="editFor !== item.id">
              {{ timeConvert(item.start_time) }}
            </th>

            <th v-if="editFor !== item.id">
              {{ timeConvert(item.end_time) }}
            </th>

            <th style="width: 100%">
              <Button type="error"> Delete </Button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <h4>No data</h4>
    </div>
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

  watch: {
    async day(newValue) {
      try {
        const { data } = await this.callApi("post", "/time-slots/created", {
          day_no_id: newValue,
        });
        this.createdSlots = data;
      } catch (error) {
        this.swr();
      }
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

.created-slot-partent {
  width: 50%;
  margin: 50px auto;
}
.main-content {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
