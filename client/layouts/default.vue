<template>
  <div>
    <nav>
      <div @click="jumpToDashBoard" style="cursor: pointer" class="left">
        <h3 class="_menu_logo_text">
          <span class="_menu_logo_symbol">A</span>
          <span class="_menu_logo_text_main">APPOINTMENT SYSTEM</span>
        </h3>
      </div>
      <div class="right">
        <span @click="jumpToProfile">{{
          $store.state.authUser.first_name
        }}</span>
        <a v-if="$store.state.authUser" @click="logout">Logout</a>
        <!-- <a v-else @click="login">Login</a> -->
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
                  <Icon type="ios-people" />
                  USERS MANAGEMENT
                </template>

                <MenuItem name="1-1">
                  <span @click="adminRoutes('/admin/student-list')">
                    Students list
                  </span>
                </MenuItem>
                <MenuItem name="1-2">
                  <span @click="adminRoutes('/admin/teacher-list')">
                    Teachers list
                  </span>
                </MenuItem>
                <MenuItem name="1-3">
                  <span @click="adminRoutes('/admin/admin-list')">
                    Admins list
                  </span>
                </MenuItem>
              </Submenu>
              <Submenu name="2">
                <template #title>
                  <Icon type="md-git-pull-request" />
                  JOIN REQUESTS
                </template>
                <MenuItem name="2-1"
                  ><span @click="adminRoutes('/admin/join-requests')"
                    >Pending requests</span
                  >
                </MenuItem>
                <MenuItem name="2-2">
                  <span @click="adminRoutes('/admin/rejected-requests')"
                    >Denied requests
                  </span></MenuItem
                >
              </Submenu>
              <Submenu name="3">
                <template #title>
                  <Icon type="md-person-add" />
                  ADD USERS
                </template>

                <MenuItem name="3-1">
                  <span @click="adminRoutes('/admin/add-users')">
                    Add a new user
                  </span>
                </MenuItem>

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
    <!-- * teacher layout -->
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
                  <Icon type="ios-clock" />
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
                  <Icon type="ios-contacts" />
                  Appointments
                </template>
                <div>
                  <MenuItem name="2-1">
                    <span @click="viewAppointmentReq"
                      >See appointment requests</span
                    >
                  </MenuItem>
                </div>
                <div>
                  <MenuItem name="2-2">
                    <span @click="viewAppointments">View appointments</span>
                  </MenuItem>
                </div>
              </Submenu>
              <Submenu name="3">
                <template #title>
                  <Icon type="md-globe" />
                  Meetings
                </template>
                <div>
                  <MenuItem name="3-1">
                    <span @click="teacherRoutes('/meetings')"
                      >View Meetings</span
                    >
                  </MenuItem>
                </div>
                <div>
                  <MenuItem name="3-2">
                    <span @click="teacherRoutes('/teacher/meeting-create')"
                      >Create Meetings</span
                    >
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
    <Layout v-if="$store.state.authUser.user_type === 'student'">
      <Breadcrumb> </Breadcrumb>
      <Content
        :style="{ padding: '24px 0', minHeight: '280px', background: '#fff' }"
      >
        <Layout>
          <Sider hide-trigger :style="{ background: '#fff' }">
            <Menu theme="light" width="auto" :open-names="['1', '2', '3']">
              <Submenu name="1">
                <template #title>
                  <Icon type="md-people" />
                  Teacher list
                </template>
                <div>
                  <MenuItem name="1-1">
                    <span @click="jumpToTeacherListForStudent"
                      >View Teachers</span
                    >
                  </MenuItem>
                </div>
              </Submenu>
              <Submenu name="2">
                <template #title>
                  <Icon type="ios-contacts" />
                  Appointments
                </template>
                <div>
                  <MenuItem name="2-1">
                    <span @click="jumpToStudentsAppointments"
                      >View Appointments</span
                    >
                  </MenuItem>
                </div>
              </Submenu>
              <Submenu name="3">
                <template #title>
                  <Icon type="md-globe" />
                  Meetings
                </template>
                <div>
                  <MenuItem name="3-1">
                    <span @click="teacherRoutes('/meetings')"
                      >View Meetings</span
                    >
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
    <div v-if="!$store.state.authUser">
      <nuxt />
    </div>

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
    jumpToStudentsAppointments() {
      this.$router.push("/student/appointment-history");
    },
    viewAppointmentReq() {
      this.$router.push(`/teacher/appointmnet-requests`);
    },
    viewAppointments() {
      this.$router.push(
        `/accepted-appointments/${this.$store.state.authUser.id}`
      );
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
    jumpToTeacherListForStudent() {
      this.$router.push("/student/teacher-list");
    },
    adminRoutes(route) {
      this.$router.push(route);
    },
    teacherRoutes(route) {
      this.$router.push(route);
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
