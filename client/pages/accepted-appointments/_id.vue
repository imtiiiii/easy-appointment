<template>
	<div style="margin: 100px 0px">
		<div
			style="
				border: 2px solid red;
				width: 60%;
				margin: 0 auto;
				background-color: white;
				box-shadow: 5px 5px 5px grey;
			"
		>
			<div class="slot">
				<h6>Date</h6>
				<h6>Agenda</h6>
				<h6>Student</h6>
				<h6>Depertment</h6>
			</div>
			<div class="slot" v-for="(data, index) of data" :key="index">
				<h4>
					{{
						data.date +
						" " +
						data.start_time +
						" - " +
						data.end_time
					}}
				</h4>
				<h4>{{ data.agenda }}</h4>

				<h4
					v-on:click="jumpToProfile(data.byWhichStudent.id)"
					style="color: blue; cursor: pointer"
				>
					{{
						data.byWhichStudent.first_name +
						" " +
						data.byWhichStudent.last_name
					}}
				</h4>
				<h4>{{ data.byWhichStudent.dept }}</h4>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: this.$route.params.id,
			data: null,
		};
	},
	async created() {
		const data = await this.callApi(
			"get",
			`/appointments/accepted?id=${this.user}`
		);
		if (data.status === 200) {
			this.data = data.data;
		}
		console.log("hello", this.data);
	},
	methods: {
		jumpToProfile(id) {
			this.$router.push(`/profile/${id}`);
		},
	},
};
</script>

<style  scoped>
.slot {
	text-align: center;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	/* grid-row-gap: 100px; */
	grid-column-gap: 60px;
	margin: 10px 0px 100px 0px;
	padding: 30px 0px;
}
</style>