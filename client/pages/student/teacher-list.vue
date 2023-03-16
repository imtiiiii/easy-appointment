<template>
  <div>
    <div id="main-wrapper">
      <div style="margin: 50px 0px">
        <h5 style="text-align:center">
          Teacher List
        </h5>
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
