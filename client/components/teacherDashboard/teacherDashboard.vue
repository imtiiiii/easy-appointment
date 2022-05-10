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
							></vue-timepicker>
						</div>
						<div class="_log_input_group">
							<vue-timepicker
								placeholder="end-time"
								v-model="endTime"
							></vue-timepicker>
						</div>
						<div>
							<input
								v-model="duration"
								type="text"
								placeholder="duration in minutes"
							/>
						</div>
						<div
							class="_log_button"
							v-if="day && startTime && endTime && duration"
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
		async addSlot() {
			// let startTime=moment(this.startTime).format("HH:mm")
			let time1 = moment().format("DD-MM-YYYY");
			let time2 = moment().format("DD-MM-YYYY");
			time1 = moment(time1 + " " + this.startTime).format(
				"DD-MM-YYYY HH:mm"
			);
			time2 = moment(time2 + " " + this.endTime).format(
				"DD-MM-YYYY HH:mm"
			);
			let x = new Date(time1);
			let y = new Date(time2);
			// console.log(x.valueOf());
			// console.log(y.valueOf());

			let diffInMs = y - x;
			// console.log("diff in ms", diffInMs);
			// *************************
			if (diffInMs <= 0) {
				return this.e("End time should be more than start time");
			}
			let diffInM = Math.floor(diffInMs / 60000);
			// console.log("diff of  min", diffInM);
			this.duration = parseInt(this.duration);
			if (this.duration > diffInM) {
				return this.e(
					"lower your duration per meeting to create atleast one slot"
				);
			}
			let slotsRequested = diffInM / this.duration;
			// console.log("slot requested =",Math.floor(slotsRequested))

			let hours = x.getHours();
			let mins = x.getMinutes();
			// console.log("hours=", hours);
			// console.log("minutes=", mins);

			// loop and create slots dividing them by duration
			for (let i = 1; i <= slotsRequested; i++) {
				console.log("index=", i);
				// **************start time *************
				// console.log(`start time ${i} `, hours + ":" + mins);
				// *********************ending minute*******************
				let endTimeInM = mins + this.duration;
				// console.log("total min=", endTimeInM);
				endTimeInM %= 60;
				// *****************ending hour
				let endTimeInH = Math.floor((mins + this.duration) / 60);
				// console.log("end time in H = ",endTimeInH)
				// console.log("end time in M = ",endTimeInM)
				// console.log(
				// 	`end time ${i} = `,
				// 	hours + endTimeInH + ":" + endTimeInM
				// );

				// ************* post to db ************
				let tempM = endTimeInM;
				let tempH = hours + endTimeInH;
				console.log("temphE=", tempH);
				if (tempM < 10) {
					tempM = "0" + tempM;
				}
				if (tempH < 10) {
					tempH = "0" + tempH;
				}
				// console.log("temphE2=", tempH);
				const end_time = tempH + ":" + tempM;
				// console.log("end time=", end_time);
				tempM = mins;
				tempH = hours;
				if (mins < 10) {
					tempM = "0" + mins;
				}
				if (hours < 10) {
					tempH = "0" + hours;
				}
				const start_time = tempH + ":" + tempM;
				// console.log("start time=", start_time);

				const data = {
					teacher_id: this.user.id,
					start_time,
					end_time,
					day_id: this.day,
				};
				console.log("data is =", data);
				const addToDb = await this.callApi(
					"post",
					"time-slots/add",
					data
				);
				console.log(addToDb);
				if (addToDb?.status === 200) {
					if (addToDb.data.msg === "possible") {
						this.s("created");
					} else {
						this.e("not possible");
					}
				} else {
					this.w("something went wrong . Please try again");
				}
				// **********************************************

				// const addToDb = await this.callApi("post", "time-slots/add", {
				// 	teacher_id: this.user.id,
				// 	start_time: this.startTime,
				// 	end_time: this.endTime,
				// 	day_id: this.day,
				// });

				// ******* setting start time for the next slot *********
				if (endTimeInM === 59) {
					hours = hours + endTimeInH + 1;
					mins = 0;
				} else {
					mins = endTimeInM;
					hours = hours + endTimeInH;
				}
			}

			// this.isLoading = true;
			// // console.log(this.day);
			// const startTime = moment(this.startTime, "HH:mm");
			// const endTime = moment(this.endTime, "HH:mm");
			// if (endTime.diff(startTime).valueOf() > 0) {
			// 	const addToDb = await this.callApi("post", "time-slots/add", {
			// 		teacher_id: this.user.id,
			// 		start_time: this.startTime,
			// 		end_time: this.endTime,
			// 		day_id: this.day,
			// 	});

			// 	// console.log(addToDb.data.msg);
			// 	this.i(addToDb.data.msg);
			// } else {
			// 	this.e("Start Time and End time input is not valid");
			// }
			// this.isLoading = false;
		},
		chooseOption(value) {
			if (this.options === "index") {
				this.options = "appoinment";
			} else {
				this.options = "index";
			}
		},
	},
	// watch:{
	//     seeTime:function(){}

	// },
	// computed:{

	// }
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