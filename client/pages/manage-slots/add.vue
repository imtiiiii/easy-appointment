<template>
  <div style="width: 100%; margin: 0 auto; border-radius: 20px">
    <!-- *********ADD TIME SLOT ********** -->
    <Form
      style="margin: 40px; border: 1px solid black"
      :model="timeSlotForm"
      ref="timeSlotForm"
      :rules="ruleValidate"
    >
      <div style="background-color: #ffffff; padding: 20px 40px">
        <div class="add-time-slot">
          <h2 style="color: #404040; font-weight: 500" class="_log_form_title">
            Add free time slots
          </h2>
          <div class="_log_form">
            <div class="_log_input_group">
              <FormItem prop="dayNo">
                <Select
                  placeholder="Select Day"
                  size="large"
                  v-model="timeSlotForm.dayNo"
                >
                  <Option value="0">sunday</Option>
                  <Option value="1">monday</Option>
                  <Option value="2">tuesday</Option>
                  <Option value="3">wednesday</Option>
                  <Option value="4">thursday</Option>
                  <Option value="5">friday</Option>
                  <Option value="6">saturday</Option>
                </Select>
              </FormItem>
            </div>
            <div class="_log_input_group">
              <FormItem prop="startTime">
                <TimePicker
                  placeholder="Start time"
                  v-model="timeSlotForm.startTime"
                  format="hh:mm a"
                  confirm
                ></TimePicker>
              </FormItem>
              <FormItem prop="endTime">
                <TimePicker
                  type="time"
                  confirm
                  placeholder="End time"
                  v-model="timeSlotForm.endTime"
                  format="hh:mm a"
                ></TimePicker>
              </FormItem>
            </div>

            <div>
              <FormItem prop="duration">
                <Input
                  type="text"
                  v-model="timeSlotForm.duration"
                  number
                  placeholder="duration in minutes"
                ></Input>
              </FormItem>
            </div>
            <div class="_log_button">
              <FormItem>
                <Button
                  type="primary"
                  style="font-weight: bold"
                  @click="handleSubmit('timeSlotForm')"
                  >Add</Button
                >
              </FormItem>
            </div>
          </div>
        </div>
      </div>
    </Form>
    <!-- <div style="margin: 40px;">
        <Button  type="dashed">
            <nuxt-link to="/teacher/created-slots">See your created slots</nuxt-link>
        </Button>
    </div> -->
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import "vue2-timepicker/dist/VueTimepicker.css";

import moment, { duration, min } from "moment";
moment().format();

export default {
  components: {
    "vue-timepicker": VueTimepicker,
  },
  data() {
    return {
      user: null,
      options: "index", // possible variable appoinment,inde
      timeSlotForm: {
        dayNo: null,
        duration: null,
        startTime: null,
        endTime: null,
      },
      allUsersCount: 0,
      teachersCount: 0,
      studentsCount: 0,
      joinRequests: 0,
      ruleValidate: {
        startTime: [
          {
            required: true,
            message: "Start and End time required",
          },
        ],
        endTime: [
          {
            required: true,
            message: "Start and End time required",
          },
        ],
        dayNo: [
          {
            required: true,
            message: "Please Select day",
          },
        ],
        duration: [
          {
            required: true,
            message: "Please select the duration of each slot",
          },
        ],
      },
    };
  },
  async created() {
    this.user = this.$store.state.authUser;
    const { data } = await this.callApi("get", "/dashboard/teacher");
  },
  methods: {
    jumptoAcceptedRequest() {
      console.log("im called accepted");
      this.$router.push(`/accepted-appointments/${this.user.id}`);
    },

    chooseOption(value) {
      if (this.options === "index") {
        this.options = "appoinment";
      } else {
        this.options = "index";
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          await this.validateTimeSlotData(this.timeSlotForm);
          this.$refs[name].resetFields();
        } else {
          this.$Message.error("Some fields are missing");

          return;
        }
      });
    },
    async validateTimeSlotData(data) {
      let startTime = moment(data.startTime, "hh:mm a Z");
      let endTime = moment(data.endTime, "hh:mm a Z");

      if (!startTime.isBefore(endTime)) {
        this.e("End time can not be before start time");
        return;
      }

      try {
        const req = await this.callApi("post", "/time-slots/add", {
          day_no: data.dayNo,
          duration: data.duration,
          start_time: startTime.format("HH:mm Z"),
          end_time: endTime.format("HH:mm Z"),
        });
        console.log("🚀 ~ file: add.vue:177 ~ validateTimeSlotData ~ req", req);

        if (req.status === 200 || req.status === 201) {
          this.i(`${req.data?.length} slots created`);
        }
      } catch (error) {
        this.swr();
      }
    },
  },
};
</script>

<style scoped>
.main-content {
  height: 100%;
  display: grid;
  grid-template: 100% /1fr 1fr;
  gap: 30px;
  padding: 50px 40px;
}
.add-time-slot {
  background-color: #fff;
  padding: 30px 10px;
}
.container_admin {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.container_child {
  width: 20%;
  height: 100px;
  background-color: #f1f1f1;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
