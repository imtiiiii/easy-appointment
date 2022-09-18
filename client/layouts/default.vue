<template>
  <div id="app" style="margin-bottom: 200px; padding-bottom: 100px;">
    <div id="main-wrapper">
      <!-- Menu -->
      <div
        style="margin: 0px height:500px"
        class="_menu"
        v-if="
          $route.path != '/login' &&
            $route.path != '/register' &&
            $route.name != 'forgot_password' &&
            $route.name != 'verify-account'
        "
      >
        <div class="_layout">
          <div class="_layout_row align-items-center">
            <div class="_layout_auto">
              <div class="_menu_left">
                <div class="_menu_logo">
                  <NuxtLink to="/home">
                    <h3 class="_menu_logo_text">
                      <span class="_menu_logo_symbol">E</span>
                      <span class="_menu_logo_text_main"
                        >APPOINTMENT SYSTEM</span
                      >
                    </h3>
                  </NuxtLink>
                </div>
              </div>
            </div>

            <div class="_layout_col _only_desktop"></div>
            <div class="nav">
              <div class="">
                <p @click="jumpToDashBoard()" class="text-white">Dashboard</p>
              </div>
              <br />
              <div class="">
                <p @click="jumpToProfile" class="text-white">Profile</p>
              </div>
              <div class>
                <p @click="logout" class="text-white">Logout</p>
              </div>
              <div class>
                <NuxtLink to="/teacher/appointmnet-requests">
                  <h6 class="text-white">Requests</h6>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Menu -->

      <div class="_main_layout">
        <Nuxt />
      </div>

      <!-- Footer -->

      <!-- Feed spin -->

      <!-- Feed spin -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moreDrop: false,
      clickMenu: false,
      isChatBox: false,
      isNotification: false,
      isFriendReq: false,
      noData: false,
      isMessage: false,
      isloaded: false,
      isHide: true,
      isHide2: true,
      tab: "",
      isMinimize: false,
      isMobileSearch: false,
    };
  },

  methods: {
    async logout() {
      //   this.logoutLoader = true
      const res = await this.callApi("get", `/auth/logout`);
      if (res.status == 200) {
        window.location = "/";
      }
      this.logoutLoader = false;
    },
    clickMenuDrop(tab) {
      if (tab != "messageDrop" && tab != "notiDrop" && tab != "friReqDrop") {
        this.tab = "";
      }

      var self = this;
      var self2 = this;
      setTimeout(function() {
        self.$nextTick(function() {
          self.isloaded = !self.isloaded;
        });
        self2.$nextTick(function() {
          self2.isHide = !self2.isHide;
        });
      }, 1000);

      return (this.tab = tab);
    },
    jumpToDashBoard() {
      this.$router.push("/home");
    },
    jumpToProfile() {
      this.$router.push(`/profile/${this.$store.state.authUser.id}`);
    },
  },

  created() {
    console.log("mixing test", this.isLoading);
  },
};
</script>
<style scoped>
.nav {
  display: flex;
  gap: 30px;
}
</style>