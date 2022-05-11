<template>
	<div
		style="
			background-color: #9cb0ba;
			margin: 10px 20px;
			padding: 20px 10px;
			height: 200vh;
		"
	>
		<div>
			<profile-details v-bind:userId="id"></profile-details>
		</div>
		<hr />
		<h3
			style="
				text-align: center;
				margin-bottom: 80px;
				text-decoration: underline;
			"
		>
			Look for available appointment scheducles:
		</h3>
		<div class="available-bookings">
			<div>
				<client-only>
					<date-picker
						:disabled-dates="previousDates"
						:inline="true"
						v-model="date_today"
						format="D"
					/>
				</client-only>
			</div>
			<div v-if="slots.length !== 0" class="slot">
				<div v-for="(slot, index) of slots" :key="index">
					<button
						v-on:click="slotId(slot.id)"
						class="update"
						style="
							background-color: #42cc8c;
							width: 100%;
							padding: 15px 0px;
						"
					>
						{{ timeConvert(slot.start_time) }} -
						{{ timeConvert(slot.end_time) }}
					</button>
					<div
						style="margin: 20px 0px"
						v-if="choosedSlotId === slot.id"
					>
						<div class="_log_input_group">
							<Input
								placeholder="Agenda in short"
								size="large"
								type="text"
								v-model="agenda"
							></Input>
							<!-- *********** -->
							<button
								v-on:click="
									sendReq(
										choosedSlotId,
										id,
										timeConvert(slot.end_time)
									)
								"
								:loading="isLoading"
								:disabled="isLoading"
								class="update"
								style="
									background-color: #e182af;
									padding: 10px 05px;
									margin-top: 5px;
								"
							>
								{{
									isLoading
										? "Please wait..."
										: "Send request"
								}}
							</button>
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<h1 style="text-align: center">No slots available</h1>
			</div>
		</div>
	</div>
</template>

<script>
import profileDetails from "../../components/profileDetails.vue";
import moment from "moment";
moment().format();
export default {
	components: { profileDetails },
	data() {
		return {
			id: this.$route.params.id,
			date_today: new Date(moment()),
			slots: [],
			agenda: "",
			choosedSlotId: null,
			previousDates: {},
		};
	},
	created() {
		// console.log("created", this.date_today);
	},
	methods: {
		formatTime(time) {
			console.log("time is ", time);
			let date = moment(this.date_today);
			let endTime = moment(time);
			let choosedDate = date.get("date");
			let choosedDay = date.get("day");
			let choosedYear = date.get("year");
			endTime.date(choosedDate);
			endTime.day(choosedDay);
			endTime.year(choosedYear);
			return endTime.toDate().toString();
		},
		slotId(id) {
			this.choosedSlotId = id;
			// console.log("slot id called", this.choosedSlotId);
		},
		async sendReq(timeSlotId, teacherId, end_time) {
			const currDate = moment(end_time, "HH:mm");
			let date = this.formatTime(currDate);
			console.log("end time faisi", date);

			const data = {
				timeSlotId,
				date,
				studentId: this.$store.state.authUser.id,
				agenda: this.agenda,
				teacherId,
			};
			// console.log("data =====", data);
			if (this.agenda === null || this.agenda === "") {
				this.isLoading = false;
				return this.e("Mention your agenda for meeting");
			}
			const req = await this.callApi("post", "/appointments/request", {
				data,
			});

			// console.log("req is ", req);
			if (req.status === 200) {
				this.agenda = "";
				this.choosedSlotId = -1;
				this.i(`${req.data.msg}`);
			} else {
				this.e("Something went wrong, try again");
			}
			this.isLoading = false;
		},
	},
	watch: {
		timings: function () {
			// console.log(" im from watch date  = ", this.date_today);
		},
		disableDates: function () {},
	},
	computed: {
		async timings() {
			this.slots = [];
			if (this.date_today !== null) {
				let date = moment(this.date_today);
				console.log("choosed date ", date.toString());
				let day = moment(this.date_today).isoWeekday().toString();
				const data = {
					teacher_id: this.id,
					day_id: parseInt(day),
				};
				console.log("sent data is ", data);
				const slots = await this.callApi(
					"get",
					`time-slots?teacher_id=${this.id}&day_id=${day}`
				);
				console.log("slots=", slots.data);
				for (let i of slots.data) {
					const endTime = this.formatTime(i.end_time);
					// console.log("end time fatairam = ", i.end_time);
					const checkForBooked = await this.callApi(
						"get",
						`/appointments/booked?endTime=${endTime}&teacher_id=${this.id}`
					);
					if (checkForBooked.data === 0) {
						this.slots.push(i);
						console.log("i is = ", i);
					}
				}
			}
		},

		disableDates() {
			let fullDate = moment(); //get the full date
			let dateOfAmonth = fullDate.get("date"); //date of the month
			fullDate.set("date", dateOfAmonth - 1); //setting date to  the previous day
			const yesterday = new Date(fullDate);
			// console.log("yestarday is ", yesterday);
			this.previousDates = {
				ranges: [
					{
						// Disable dates in given ranges (exclusive).
						from: new Date(1950, 11, 25),
						to: yesterday,
					},
				],
			};
		},
	},
};
</script>

<style>
.available-bookings {
	display: grid;
	grid-template-columns: 1fr 2fr;
	grid-row-gap: 26px;
}
.slot {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-row-gap: 20px;
	grid-column-gap: 20px;
}
</style>