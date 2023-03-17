<template>
  <div style="margin: 30px auto; width: 50%">
    <div v-if="rejectedSignup === null || rejectedSignup.length < 1">
      <h5 style="text-align: center">Nothing to show....</h5>
    </div>
    <div
      v-for="(request, index) of rejectedSignup"
      :key="index"
      style="margin: 30px 20px; display: flex"
    >
      <div class="card">
        <h4>name: {{ request.first_name + " " + request.last_name }}</h4>
        <hr />
        <h4>email:{{ request.email }}</h4>
        <hr />
        <h4>identity:{{ request.user_type }}</h4>
        <hr />
        <h4 v-if="request.user_type === 'student'">
          Student id: {{ request.student_id }}
        </h4>

        <div style="margin: 30px 0px">
          <button
            v-on:click.once="accept(request.id, index)"
            class="accept"
            style="background-color: #42cc8c; width: 100px; padding: 15px 0px"
            :loading="isLoading"
            :disabled="isLoading"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rejectedSignup: [],
      isLoading: false,
    };
  },
  async created() {
    const res = await this.callApi("get", "dashboard/rejected-signup-request");
    if (res.status === 200) {
      this.rejectedSignup = res.data;
    }
  },
  methods: {
    async accept(id, index) {
      console.log("accept called");
      this.isLoading = true;
      const accept = await this.callApi("put", "dashboard/update/status", {
        id: id,
        status: "1",
      });
      console.log("🚀 ~ file: deniedRequests.vue:60 ~ accept:", accept);
      this.isLoading = false;
      if (accept.status === 200) {
        this.rejectedSignup.splice(index, 1);
        this.s("Request accepted successfully");
      } else {
        this.e("Try again");
      }
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
  width: 100%;
  margin: 20px auto;
}
a.accept {
  display: inline-block;
  padding: 0.46em 1.6em;
  border: 0.1em solid #000000;
  margin: 0 0.2em 0.2em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #000000;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  background-color: #ffffff;
  text-align: center;
  transition: all 0.15s;
}
a.accept:hover {
  text-shadow: 0 0 2em rgba(255, 255, 255, 1);
  color: #ffffff;
  border-color: #ffffff;
}
a.reject {
  display: inline;
  padding: 0.46em 1.6em;
  border: 0.1em solid #000000;
  margin: 0 0.2em 0.2em 0;
  border-radius: 0.12em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #000000;
  text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
  background-color: #ffffff;
  text-align: center;
  transition: all 0.15s;
}
a.reject:hover {
  text-shadow: 0 0 2em rgba(255, 255, 255, 1);
  color: #ffffff;
  border-color: #ffffff;
}
</style>
