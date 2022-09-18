<template>
  <div>
    <div id="main-wrapper">
      <div style="margin: 100px 0px">
        <h2 style="text-align:center; text-decoration:underline">
          Teacher List
        </h2>
        <div>
          <teacher_list></teacher_list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import teacherListVue from "../../components/adminDashboard/teacherList.vue";
export default {
  components: {
    teacher_list: teacherListVue,
  },
};
</script>

<style></style>
