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
						<th>User Name</th>
						<th>Email</th>
						<th>Dept</th>

						<th>Agenda</th>
						<th>Options</th>
					</tr>
					<tr
						v-for="(item, index) in upCommingAppoinments"
						:key="index"
					>
						<th style="padding: 0px 40px">
							<h6 style="width: 100%">
								{{
									formatDate(
										item.date,
										item.forWhichTimeSlot.start_time,
										item.forWhichTimeSlot.end_time
									)
								}}
							</h6>
						</th>
						<th>{{ item.forWhichTimeSlot.day.day_name }}</th>
						<th>
							<button
								id="link"
								v-on:click="
									jumpToProfile(item.byWhichStudent.id)
								"
							>
								{{ item.byWhichStudent.user_name }}
							</button>
						</th>
						<th>{{ item.byWhichStudent.email }}</th>
						<th>{{ item.byWhichStudent.dept }}</th>

						<th>{{ item.agenda }}</th>
						<th>
							<!-- acceptAppointment(item.id,index,1) here 1 means enum value of status accept -->
							<Button
								v-on:click="changeStatus(item.id, index, '1')"
								>Accept</Button
							>
							<!-- acceptAppointment(item.id,index,1) here 2 means enum value of status rejection -->
							<Button
								v-on:click="changeStatus(item.id, index, '2')"
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
			upCommingAppoinments: [],
		};
	},
	async created() {
		const res = await this.callApi(
			"get",
			"/appointments/upCommingAppoinments"
		);
		const data = res.data;
		console.log("up coming data = ", data);
		this.upCommingAppoinments = data;
		// console.log(res);
		// console.log(this.upCommingAppoinments);
	},
	methods: {
		async changeStatus(itemId, index, status) {
			try {
				const data = await this.callApi("put", "/appointments/status", {
					appointmentId: itemId,
					status: status,
				});
				this.upCommingAppoinments.splice(index, 1);
				const messageBody =
					status == "1"
						? "Appointment Accepted"
						: "Appointment Rejected";
				this.i(messageBody);
			} catch (error) {
				this.swr();
			}
		},
		jumpToProfile(profileId) {
			this.$router.push(`profile/${profileId}`);
		},
		formatDate(date, startTime, endTime) {
			console.log(date);
			console.log(startTime);
			console.log(endTime);
			const tempDay = moment(date, "DD-MM-YYYY");
			const newDate = moment(tempDay).format("DD-MM-YYYY");
			console.log("newDay= ", newDate);
			const newStartTime = moment(startTime).format("hh:mm a");
			const newEndTime = moment(endTime).format("hh:mm a");
			// console.log(newStartTime);
			// console.log(newEndTime);
			const newTime =
				newDate + " " + newStartTime + " - " + " " + newEndTime;
			return newTime;
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
	border: 3px solid #dddddd;
}
td {
	padding: 10px 30px;
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