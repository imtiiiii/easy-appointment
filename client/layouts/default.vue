<template>
  <div>
    <nav>
      <div class="left">
        <h3 class="_menu_logo_text">
          <span class="_menu_logo_symbol">A</span>
          <span class="_menu_logo_text_main">APPOINTMENT SYSTEM</span>
        </h3>
      </div>
      <div class="right">
        <span>{{ $store.state.authUser.first_name }}</span>
        <a v-if="$store.state.authUser" @click="logout">Logout</a>
        <a v-else @click="login">Login</a>
      </div>
    </nav>
    <!-- * admin layout -->
    <Layout v-if="$store.state.authUser.user_type === 'admin'">
      <Breadcrumb> </Breadcrumb>
      <Content
        :style="{ padding: '24px 0', minHeight: '280px', background: '#fff' }"
      >
        <Layout>
          <Sider hide-trigger :style="{ background: '#fff' }">
            <Menu theme="light" width="auto" :open-names="['1', '2', '3']">
              <Submenu name="1">
                <template #title>
                  <Icon type="ios-navigate"></Icon>
                  USERS MANAGEMENT
                </template>
                <MenuItem name="1-1">Students list</MenuItem>
                <MenuItem name="1-2">Teachers list </MenuItem>
                <MenuItem name="1-3">Admins list</MenuItem>
              </Submenu>
              <Submenu name="2">
                <template #title>
                  <Icon type="ios-keypad"></Icon>
                  JOIN REQUESTS
                </template>
                <MenuItem name="2-1">Pending requests</MenuItem>
                <MenuItem name="2-2">Denied requests</MenuItem>
              </Submenu>
              <Submenu name="3">
                <template #title>
                  <Icon type="ios-analytics"></Icon>
                  ADD USERS
                </template>
                <!-- <MenuItem name="3-1">Option 1</MenuItem>
                <MenuItem name="3-2">Option 2</MenuItem> -->
              </Submenu>
            </Menu>
          </Sider>
          <Content
            :style="{
              padding: '24px',
              minHeight: '100vh',
              background: '#fff',
            }"
          >
            <nuxt />
          </Content>
        </Layout>
      </Content>
    </Layout>
    <Layout v-if="$store.state.authUser.user_type === 'teacher'">
      <Breadcrumb> </Breadcrumb>
      <Content
        :style="{ padding: '24px 0', minHeight: '280px', background: '#fff' }"
      >
        <Layout>
          <Sider hide-trigger :style="{ background: '#fff' }">
            <Menu theme="light" width="auto" :open-names="['1', '2', '3']">
              <Submenu name="1">
                <template #title>
                  <Icon type="ios-navigate"></Icon>
                  Manage Slots
                </template>
                <div>
                  <MenuItem name="1-1">
                    <span @click="jumpToAddTimeSlot">Add time slot</span>
                  </MenuItem>
                </div>
                <template>
                  <MenuItem name="1-2">
                    <span @click="jumpToSeeCreatedSlots"
                      >See created slots</span
                    >
                  </MenuItem>
                </template>
              </Submenu>

              <Submenu name="2">
                <template #title>
                  <Icon type="ios-keypad"></Icon>
                  Accepted Appointments
                </template>
              </Submenu>
              <Submenu name="3">
                <template #title>
                  <Icon type="ios-analytics"></Icon>
                  Appointment Requests
                </template>
                <!-- <MenuItem name="3-1">Option 1</MenuItem>
                <MenuItem name="3-2">Option 2</MenuItem> -->
              </Submenu>
            </Menu>
          </Sider>
          <Content
            :style="{
              padding: '24px',
              minHeight: '100vh',
              background: '#fff',
            }"
          >
            <nuxt />
          </Content>
        </Layout>
      </Content>
    </Layout>
    <Layout v-if="$store.state.authUser.user_type === 'student'">
      <Breadcrumb> </Breadcrumb>
      <Content
        :style="{ padding: '24px 0', minHeight: '280px', background: '#fff' }"
      >
        <Layout>
          <Sider hide-trigger :style="{ background: '#fff' }">
            <Menu theme="light" width="auto" :open-names="['1']">
              <Submenu name="1">
                <template #title>
                  <Icon type="ios-navigate"></Icon>
                  Teacher list
                </template>
                <div>
                  <MenuItem name="1-1">
                    <span @click="jumpToAddTimeSlot">View Teachers</span>
                  </MenuItem>
                </div>
              </Submenu>
            </Menu>
          </Sider>
          <Content
            :style="{
              padding: '24px',
              minHeight: '100vh',
              background: '#fff',
            }"
          >
            <nuxt />
          </Content>
        </Layout>
      </Content>
    </Layout>
    <Footer class="layout-footer-center"></Footer>
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
      setTimeout(function () {
        self.$nextTick(function () {
          self.isloaded = !self.isloaded;
        });
        self2.$nextTick(function () {
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
    jumpToAddTimeSlot() {
      console.log("called");
      this.$router.push("/manage-slots/add");
    },
    jumpToSeeCreatedSlots() {
      this.$router.push("/teacher/created-slots");
    },
  },

  created() {
    console.log("mixing test", this.isLoading);
  },
};
</script>

<style scoped>
nav {
  display: flex;
  padding: 30px 20px;
  align-items: center;
  justify-content: space-between;
  background-color: #404040;
}
.left {
  flex: 1;
}
.right {
  flex: 1;
  margin-left: 1em;
  text-align: right;
}
.right > a,
.right > span {
  margin-left: 1em;
  cursor: pointer;
  color: aliceblue;
}
</style>
