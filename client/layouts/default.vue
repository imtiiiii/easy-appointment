<template>
  <div id="app" style="margin-bottom: 200px; padding-bottom: 100px">
    <div id="main-wrapper">
      <!-- Menu -->
      <div
        style="margin: 0px"
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
                  <NuxtLink to="/">
                    <h3 class="_menu_logo_text">
                      <span class="_menu_logo_symbol">A</span>
                      <span class="_menu_logo_text_main"
                        >APPOINTMENT SYSTEM</span
                      >
                    </h3>
                  </NuxtLink>
                </div>

                <!-- <p class="_menu_left_home"><i class="fas fa-home"></i> <i class="fal fa-house-day"></i></p> -->
              </div>
            </div>

            <!-- Mobile and Ipad Menu button -->
            <div class="_layout_col _only_sm_md _desk_hidden">
              <NuxtLink to="/mobileMenu"
                ><button class="_2btn _btn_sm">Menu</button></NuxtLink
              >
            </div>
            <!-- Mobile and Ipad Menu button -->

            <div class="_layout_col _only_desktop">
              <!-- 
				  <div class="_menu_search">
                <div class="_menu_search_main">
                  <div class="_menu_search_icon">
                    <i class="fas fa-search"></i>
                  </div>

                  <div class="_menu_search_input">
                    <input type="text" placeholder="Searchhh" />
                  </div>
                </div>
              </div>
			   -->
            </div>

            <div class="nav">
              <div class="">
                <a @click="jumpToDashBoard()" class="text-white">Dashboard</a>
              </div>
              <br />
              <div class="">
                <a
                  @click="jumpToProfile"
                  href="javascript:void(0)"
                  class="text-white"
                  >Profile</a
                >
              </div>
              <div class>
                <a @click="logout" class="text-white">Logout</a>
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
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      isMessage: false,
      isloaded: false,

      tab: "",
    };
  },

  methods: {
    ...mapActions(["checkUser"]),
    async logout() {
      const res = await this.callApi("get", `/auth/logout`);
      if (res.status == 200) {
        await this.checkUser();
        this.$router.push("/login");
      }
      this.logoutLoader = false;
    },

    jumpToDashBoard() {
      this.$router.push("/home");
    },
    jumpToProfile() {
      this.$router.push(`/profile/${this.$store.state.authUser.id}`);
    },
  },
};
</script>
<style scoped>
.nav {
  display: flex;
  gap: 30px;
}
</style>