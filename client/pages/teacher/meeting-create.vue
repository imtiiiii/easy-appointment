<template>
  <div>
    <Row class="centered">
      <i-col span="12">
        <Card>
          <Form
            ref="meetingForm"
            :model="meeting"
            :rules="meetingRules"
            :label-width="120"
          >
            <FormItem label="Meeting Agenda" prop="agenda">
              <Input
                v-model="meeting.agenda"
                placeholder="Enter meeting agenda"
              />
            </FormItem>
            <FormItem label="Meeting Link" prop="link">
              <Input v-model="meeting.link" placeholder="Enter meeting link" />
            </FormItem>
            <FormItem label="Description" prop="description">
              <Input
                v-model="meeting.description"
                placeholder="Enter meeting description"
              />
            </FormItem>
            <FormItem label="Datetime" prop="datetime">
              <DatePicker
                v-model="meeting.datetime"
                type="datetime"
                placeholder="Select datetime"
              />
            </FormItem>
            <FormItem label="Invitees" prop="invitees">
              <Select
                v-model="meeting.invitees"
                filterable
                remote
                :remote-method="searchUsers"
                :loading="loadingUsers"
                placeholder="Enter invitee name or email"
                multiple
                :clearable="true"
                :collapse-tags="true"
                :max-tag-count="3"
              >
                <Option
                  v-for="(user, index) in users"
                  :key="index"
                  :value="user.id"
                  >{{ user.first_name + " " + user.last_name }} ({{
                    user.email
                  }})</Option
                >
              </Select>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="createMeeting"
                >Create Meeting Room</Button
              >
            </FormItem>
          </Form>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      meeting: {
        agenda: "",
        link: "",
        description: "",
        datetime: "",
        invitees: [],
      },
      loadingUsers: false,
      users: [],
      meetingRules: {
        agenda: [
          {
            required: true,
            message: "Please enter meeting agenda",
            trigger: "blur",
          },
        ],
        link: [
          {
            required: true,
            message: "Please enter meeting link",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "Please enter meeting description",
            trigger: "blur",
          },
        ],
        datetime: [
          {
            type: "date",
            required: true,
            message: "Please select datetime",
            trigger: "change",
          },
        ],
        invitees: [
          {
            type: "array",
            required: true,
            message: "Please select invitees",
            trigger: "change",
          },
        ],
      },
    };
  },
  async created() {
    const req = await this.callApi("get", "/auth/get-user-list");
    console.log("🚀 ~ file: meeting-create.vue:114 ~ req:", req);
    if (req?.status === 200) {
      this.users = req.data;
    }
  },
  methods: {
    async createMeeting() {
      this.$refs.meetingForm.validate(async (valid) => {
        if (valid) {
          console.log(this.meeting, "this.meeting");
          // Call API to create meeting room with this.meeting object
          const req = await this.callApi("post", "/meeting/create", this.meeting);
          console.log("🚀 ~ file: meeting-create.vue:137 ~ req:", req)
          if (req.status === 200) {
            this.$Message.success("Meeting room created successfully");
            this.$router.push("/teacher/meeting-list");
          }
        }
      });
    },
    async searchUsers(query) {
      this.loadingUsers = true;
      const req = await this.callApi(
        "get",
        `/auth/get-user-list?search=${query}`
      );
      console.log("🚀 ~!!!! ~ req:", req);
      if (req?.status === 200) {
        this.users = req.data;
      }
      this.loadingUsers = false;
    },
  },
};
</script>
<style scoped>
.centered {
  display: flex;
  justify-content: center;

  height: 100vh;
}
</style>
