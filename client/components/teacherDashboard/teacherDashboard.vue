<template>
  <div>
    <div>
      <button
        style="marging: 50px 20px"
        class="_log_btn _2menu_long"
        type="button"
        v-on:click="chooseOption()"
      >
        {{ options === "appoinment" ? "Create Slot" : "Appoinments Request" }}
      </button>
      <button
        style="marging: 50px 20px"
        class="_log_btn _2menu_long"
        v-on:click="jumptoAcceptedRequest"
      >
        See accepted appoinments
      </button>
    </div>
    <!-- ***********CREATED SLOT ********* -->
    <div class="main-content" v-if="options === 'index'">
      <div style="background-color: #ffffff">
        <created-slot></created-slot>
      </div>
      <!-- *********ADD TIME SLOT ********** -->
      <Form :model="timeSlotForm" ref="timeSlotForm" :rules="ruleValidate">
        <div style="background-color: #ffffff">
          <div class="add-time-slot">
            <h2 class="_log_form_title">
              Add available time slots
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
import availableSlots from "./availableSlots.vue";
import upcommingAppoinments from "./upcommingAppoinments.vue";
import moment, { duration, min } from "moment";
moment().format();

export default {
  components: {
    "vue-timepicker": VueTimepicker,
    "created-slot": createdSlot,
    "available-slot": availableSlots,
    "uppcomming-appoinments": upcommingAppoinments
  },
  data() {
    return {
      user: null,
      options: "index", // possible variable appoinment,inde
      timeSlotForm: {
        dayNo: null,
        duration: null,
        startTime: null,
        endTime: null
      },
      ruleValidate: {
        startTime: [
          {
            required: true,
            message: "Start and End time required"
          }
        ],
        endTime: [
          {
            required: true,
            message: "Start and End time required"
          }
        ],
        dayNo: [
          {
            required: true,
            message: "Please Select day"
          }
        ],
        duration: [
          {
            required: true,
            message: "Please select the duration of each slot"
          }
        ]
      }
    };
  },
  created() {
    this.user = this.$store.state.authUser;
    
  },
  methods: {
    jumptoAcceptedRequest() {
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
      this.$refs[name].validate(valid => {
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
          end_time: endTime.format("HH:mm")
        });
        
        if (req.status === 200 || req.status === 201) {
          this.i(`${req.data?.length} slots created`);
        }
      } catch (error) {
        this.swr();
      }
    }
  }
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