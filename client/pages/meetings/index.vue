<template>
  <div>
    <div style="margin: 30px 0">
      <h5 style="text-align: center">Your meetings</h5>
    </div>
    <Row v-if="meetings.length > 0" :gutter="16" type="flex" justify="center">
      <Col :span="20" :offset="2">
        <Table :data="meetings" :columns="columns" border></Table>
      </Col>
    </Row>
    <div v-else style="text-align: center">
      <h5>No meetings found</h5>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "MeetingsTable",

  data() {
    return {
      meetings: [],
      columns: [
        {
          title: "Meeting ID",
          key: "meeting_id",
        },
        {
          title: "Date",
          key: "date",
          render: (h, params) => {
            return h("p", moment(params.row.meeting.datetime).format("llll"));
          },
        },
        {
          title: "Meeting Agenda",
          key: "meeting",
          render: (h, params) => {
            return h("p", params.row.meeting.agenda);
          },
        },
        {
          title: "Meeting Host",
          key: "meeting_host",
          render: (h, params) => {
            return h(
              "p",
              params.row.meeting.host.first_name +
                " " +
                params.row.meeting.host.last_name
            );
          },
        },
        {
          title: "Meeting Link",
          key: "meeting_link",
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: `/${params.row.meeting.link}`,
                },
              },
              params.row.meeting.link
            );
          },
        },
        {
          title: "View Meeting",
          key: "view_meeting",
          render: (h, params) => {
            console.log("p", params);
            return h(
              "a",
              {
                attrs: {
                  href: `/meetings/${params.row.meeting_id}`,
                },
              },
              "View"
            );
          },
        },
      ],
    };
  },
  async created() {
    const meetings = await this.callApi("get", "/meeting/meeting-list/");
    console.log("🚀 ~ file: index.vue:69 ~ meetings:", meetings);

    if (meetings?.status === 200) {
      this.meetings = meetings.data;
    }
  },
};
</script>
