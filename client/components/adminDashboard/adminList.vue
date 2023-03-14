<template>
  <div style="margin: 20px 20px">
    
    <div v-for="(admin, index) of admins" :key="index">
      <div class="card">
        <div class="card-row">
          <div class="card-label">Name:</div>
          <div class="card-value">
            {{ admin.first_name + " " + admin.last_name }}
          </div>
        </div>
        <div class="card-row">
          <div class="card-label">Email:</div>
          <div class="card-value">{{ admin.email }}</div>
        </div>
        <div class="card-row">
          <div class="card-label">Department:</div>
          <div class="card-value">{{ admin.dept ?? "N/A" }}</div>
        </div>
      
        <button href="#" class="card-button" v-on:click="goToProfile(admin.id)">
          View Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      admins: [],
    };
  },
  async created() {
    const admins = await this.callApi("get", "/dashboard/admin-list/");
    console.log("🚀 ~ file: adminList.vue:58 ~ admins:", admins.data)
    if (admins?.status === 200) {
      this.admins = admins.data;
    }
  },
  methods: {
    async erase(id, index) {
      const dlt = await this.callApi("delete", "/auth/delete", {
        id,
      });
      if (dlt.status !== 200) {
        this.e("Something went wrong.Try again");
      } else {
        this.admins.splice(index, 1);
        this.s("Successfull");
      }
      },
    async goToProfile(id) {
      this.$router.push(`/profile/${id}`);
    },
    update(id) {
      this.$router.push(`/profile/${id}`);
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 50%;
  margin: 20px auto;
}

.card-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.card-label {
  flex: 1;
  font-weight: bold;
}

.card-value {
  flex: 2;
}

.card-button {
  display: block;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.card-button:hover {
  background-color: #0062cc;
}
</style>
