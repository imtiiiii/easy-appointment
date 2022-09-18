<template>
  <div style="">
    <div style="width:50%; margin:50px auto">
      <Row :gutter="25" style="width:100%">
        <Col  span="12">
          <Button
            style="width:100%"
            type="primary"
            @click="jumptoAcceptedRequest"
            >Accepted appoinments</Button
          >
        </Col>
        <Col  span="12">
          <Button style="width:100%" type="primary">
            <NuxtLink to="/teacher/appointmnet-requests"
              ><span class="text-white">Appointment requests</span></NuxtLink
            >
          </Button>
        </Col>
        <Col style="margin:10px auto;" span="24">
          <Button style="width:100%" type="primary">
            <NuxtLink to="/teacher/created-slots"
              ><span class="text-white">Slots</span></NuxtLink
            >
          </Button>
        </Col>
      </Row>

      <!-- <Button type="primary">
        <NuxtLink to="/teacher/appointmnet-requests"
          ><span class="text-white">Slots</span></NuxtLink
        >
      </Button> -->
    </div>

    <div style="width:100%;margin:0 auto;;border-radius:20px">
      <!-- *********ADD TIME SLOT ********** -->
      <Form style="margin:40px;border:1px solid blue" :model="timeSlotForm" ref="timeSlotForm" :rules="ruleValidate">
        <div style="background-color: #ffffff;padding:20px">
          <div class="add-time-slot">
            <h2 class="_log_form_title">Add available time slots</h2>
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
      <!-- ********* AVAILABLE SLOTS ************ -->
      <!-- <div style="background-color: #ffffff">
				<available-slot></available-slot>
			</div> -->
    </div>

    <!-- If app user click appoinment request -->
    <div style="display: flex" v-if="options === 'appoinment'">
      <uppcomming-appoinments />
    </div>
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import "vue2-timepicker/dist/VueTimepicker.css";
import createdSlot from "./createdSlots.vue";

import upcommingAppoinments from "./upcommingAppoinments.vue";
import moment, { duration, min } from "moment";
moment().format();

export default {
  components: {
    "vue-timepicker": VueTimepicker,
    "created-slot": createdSlot,

    "uppcomming-appoinments": upcommingAppoinments,
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
  created() {
    this.user = this.$store.state.authUser;
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
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.validateTimeSlotData(this.timeSlotForm);
        } else {
          this.$Message.error("Fail!");

          return;
        }
      });
    },
    async validateTimeSlotData(data) {
      let startTime = moment(data.startTime, "hh:mm a");
      let endTime = moment(data.endTime, "hh:mm a");

      if (!startTime.isBefore(endTime)) {
        this.e("End time can not be before start time");
        return;
      }

      try {
        const req = await this.callApi("post", "/time-slots/add", {
          day_no: data.dayNo,
          duration: data.duration,
          start_time: startTime.format("HH:mm"),
          end_time: endTime.format("HH:mm"),
        });

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

<style>
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
</style>