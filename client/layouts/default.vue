<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu :style="{ display:'flex',alignItems:'center',justifyContent:'space-between' }" mode="horizontal" theme="dark" active-name="1">
          <div  class="_menu_logo">
            <NuxtLink to="/home">
              <h3 class="_menu_logo_text">
                <span class="_menu_logo_symbol">A</span>
                <span class="_menu_logo_text_main">APPOINTMENT SYSTEM</span>
              </h3>
            </NuxtLink>
          </div>
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
        </Menu>
      </Header>
      <Layout :style="{ padding: '0 50px' }">
        <Breadcrumb :style="{ margin: '16px 0' }"> </Breadcrumb>
        <Content
          :style="{ padding: '24px 0', minHeight: '280px', background: '#fff' }"
        >
          <Layout>
            <Sider hide-trigger :style="{ background: '#fff' }">
              <Menu
                active-name="1-2"
                theme="light"
                width="auto"
                :open-names="['1']"
              >
                <Submenu name="1">
                  <template #title>
                    <Icon type="ios-navigate"></Icon>
                    Item 1
                  </template>
                  <MenuItem name="1-1">Option 1</MenuItem>
                  <MenuItem name="1-2">Option 2</MenuItem>
                  <MenuItem name="1-3">Option 3</MenuItem>
                </Submenu>
                <Submenu name="2">
                  <template #title>
                    <Icon type="ios-keypad"></Icon>
                    Item 2
                  </template>
                  <MenuItem name="2-1">Option 1</MenuItem>
                  <MenuItem name="2-2">Option 2</MenuItem>
                </Submenu>
                <Submenu name="3">
                  <template #title>
                    <Icon type="ios-analytics">EA</Icon>
                    Item 3
                  </template>
                  <MenuItem name="3-1">Option 1</MenuItem>
                  <MenuItem name="3-2">Option 2</MenuItem>
                </Submenu>
              </Menu>
            </Sider>
            <Content
              :style="{
                padding: '24px',
                minHeight: '280px',
                background: '#fff',
              }"
            >
              <nuxt />
            </Content>
          </Layout>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">2011-2016 &copy; View Design</Footer>
    </Layout>
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
  },

  created() {
    console.log("mixing test", this.isLoading);
  },
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #f7faff;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
</style>
