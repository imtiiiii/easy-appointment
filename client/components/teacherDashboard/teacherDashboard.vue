<template>
	<div>
		<div>
			<button
				style="marging: 50px 20px"
				class="_log_btn _2menu_long"
				type="button"
				v-on:click="chooseOption()"
			>
				{{
					options === "appoinment"
						? "Create Slot"
						: "Appoinments Request"
				}}
			</button>
			<button v-on:click="jumptoAcceptedRequest">
				See accepted appoinments
			</button>
		</div>
		<!-- ***********CREATED SLOT ********* -->
		<div class="main-content" v-if="options === 'index'">
			<div style="background-color: #ffffff">
				<created-slot></created-slot>
			</div>
			<!-- *********ADD TIME SLOT ********** -->
			<div style="background-color: #ffffff">
				<div class="add-time-slot">
					<h2 class="_log_form_title">Add available time slots</h2>
					<div class="_log_form">
						<div class="_log_input_group">
							<Select
								placeholder="Select Day"
								size="large"
								v-model="day"
							>
								<Option value="1">monday</Option>
								<Option value="2">tuesday</Option>
								<Option value="3">wednesday</Option>
								<Option value="4">thursday</Option>
								<Option value="5">friday</Option>
								<Option value="6">satarday</Option>
								<Option value="7">sunday</Option>
							</Select>
						</div>
						<div class="_log_input_group">
							<vue-timepicker
								placeholder="start-time"
								v-model="startTime"
								format="hh:mm: a"
							></vue-timepicker>
						</div>
						<div class="_log_input_group">
							<vue-timepicker
								format="hh:mm: a"
								placeholder="end-time"
								v-model="endTime"
							></vue-timepicker>
						</div>
						<div>
							<input
								v-model="duration"
								type="text"
								placeholder="duration in minutes"
								style="padding: 15px 10px"
							/>
						</div>
						<div
							class="_log_button"
							v-if="
								day &&
								startTime.length === 9 &&
								endTime.length === 9 &&
								duration
							"
						>
							<Button
								@click="addSlot"
								type="success"
								size="large"
								long
								>Add</Button
							>
						</div>
					</div>
				</div>
			</div>
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
		"uppcomming-appoinments": upcommingAppoinments,
	},
	data() {
		return {
			day: "",
			startTime: "",
			endTime: "",
			user: null,
			duration: null,
			options: "index", // possible variable appoinment,index
		};
	},
	created() {
		this.user = this.$store.state.authUser;
		// console.log(this.user);
	},
	methods: {
		jumptoAcceptedRequest() {
			this.$router.push(`/accepted-appointments/${this.user.id}`);
		},
		clearData() {
			this.startTime = "";
			this.endTime = "";
			this.duration = "";
			this.day = "";
		},
		async addSlot() {
			this.isLoading = true;
			// console.log("start time = ", this.startTime);
			// console.log("start time = ", this.endTime);
			this.duration = parseInt(this.duration);
			if (this.duration === NaN) {
				this.isLoading = false;
				return this.e("provide duration properly");
			}
			let start = moment();
			let end = moment();
			let x = moment(this.startTime, "hh:mm a");
			let y = moment(this.endTime, "hh:mm a");
			console.log("hope", this.startTime);
			start.set({
				hours: x.get("hour"),
				minutes: x.get("minute"),
			});
			end.set({
				hours: y.get("hour"),
				minutes: y.get("minute"),
			});
			console.log("start time = ", start.toString());
			console.log("start time = ", end.toString());

			// // start = moment(start + "" + this.startTime);
			// console.log(
			// 	"start holo finaal ",
			// 	start.format("DD-MM-YYYY hh:mm a")
			// );
			// let end = moment();
			// end = moment(end + " " + this.endTime);
			// console.log("start holo ", end);

			// console.log("start is ", start.toString());
			// console.log("end is ", end.toString());
			if (start.isSame(end) || end.isBefore(start)) {
				// console.log("hello guys");
				this.e(
					"Start and end time are same or end time is behind start time"
				);
			}
			// let startTime=moment(this.startTime).format("HH:mm")
			// let time1 = moment().format("DD-MM-YYYY");
			// let time2 = moment().format("DD-MM-YYYY");
			// time1 = moment(time1 + " " + this.startTime).format(
			// 	"DD-MM-YYYY HH:mm"
			// );
			// time2 = moment(time2 + " " + this.endTime).format(
			// 	"DD-MM-YYYY HH:mm"
			// );
			// // ************* (x,y)and(time1,time2) both = start and end time   ********************

			// console.log(start.valueOf());
			// console.log(end.valueOf());

			let diffInMs = end - start;
			// console.log("diff in ms", diffInMs);
			// // ***********converting milliseconds to seconds***********
			let diffInM = Math.floor(diffInMs / 60000);
			// console.log("min difference ", diffInM);

			// console.log("duration is", this.duration);
			// ***********if single slot duration is greater than the whole start-end time duration *********
			if (this.duration > diffInM) {
				this.isLoading = false;
				return this.e(
					"lower your duration per meeting to create atleast one slot"
				);
			}
			// number of slots will be allocated if this range of time are all available
			const slotsRequested = Math.floor(diffInM / this.duration);
			// console.log("slots requested", slotsRequested);
			// NUMBER OF SLOTS THAT ARE MADE CONSIDERING TIME AND PREVIOUS CREATED SLOTS
			let cntOfSlotsCreated = 0;
			// ************ It will contain starting time's hour and minute ****************

			let hours = start.hour();
			let mins = start.minute();
			// console.log("hours = ", hours);
			// console.log("hours = ", mins);

			// *********** loop to see and allocate  slots considering slot requests and slots availibility *************
			for (let i = 1; i <= slotsRequested; i++) {
				// console.log("index=", i);
				// **************start time =hours and mins *************
				// *********************ending minute*******************
				// end time minute
				let endTimeInM = mins + this.duration;
				// separating hour and minutes from end time
				// ***************ending minute
				endTimeInM %= 60;
				// console.log(
				// 	"end time in  min= ",
				// 	typeof endTimeInM,
				// 	endTimeInM
				// );
				// *****************ending hour
				let endTimeInH = Math.floor((mins + this.duration) / 60);
				end.set("hour", parseInt(endTimeInH + hours));
				end.set("minute", parseInt(endTimeInM));
				// console.log("new start time = ", start.toString());
				// console.log("new end time is= ", end.toString());

				// ************* POST TO DB ****************

				const start_time = start;
				const end_time = end;
				const data = {
					teacher_id: this.user.id,
					start_time,
					end_time,
					day_id: this.day,
				};

				const addToDb = await this.callApi(
					"post",
					"time-slots/add",
					data
				);
				// console.log(addToDb);
				if (addToDb?.status === 200) {
					if (addToDb.data.msg === "possible") {
						// this.s("created");
						cntOfSlotsCreated++;
					}
				} else {
					this.w("something went wrong . Please try again");
					this.isLoading = false;
					break;
				}

				// **********************************************

				if (endTimeInM === 59) {
					hours = endTimeInH + hours + 1;
					mins = 0;
				} else {
					hours = endTimeInH + hours;
					mins = parseInt(endTimeInM);
				}
				// ******SETTING NEW START TIME ********
				start.set("hour", parseInt(hours));
				start.set("minute", parseInt(mins));
			}
			this.i(`${cntOfSlotsCreated} slots created`);

			this.isLoading = false;
		},
		chooseOption(value) {
			if (this.options === "index") {
				this.options = "appoinment";
			} else {
				this.options = "index";
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