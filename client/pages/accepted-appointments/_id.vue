<template>
	<div style="margin: 100px 0px">
		<div>
			<div class="slot">
				<h6>Date</h6>
				<h6>Agenda</h6>
				<h6>Time</h6>
				<h6>Student</h6>
				<h6>Depertment</h6>
			</div>
			<div class="slot" v-for="(data, index) of data" :key="index">
				<h4>data</h4>
				<h4>{{ data.agenda }}</h4>
				<h4>time</h4>
				<h4>
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
};
</script>

<style  scoped>
.slot {
	text-align: center;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	/* grid-row-gap: 100px; */
	grid-column-gap: 60px;
	margin: 10px 0px 100px 0px;
	padding: 30px 0px;
}
</style>