<template>
  <div>
    <div id="main-wrapper">
      <div style="margin: 100px 0px">
        <h2 style="text-align:center; text-decoration:underline">
          See Created Slots
        </h2>
        <div>
          <created_slots></created_slots>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createdSlotsVue from "../../components/teacherDashboard/createdSlots.vue";
import upcommingAppoinmentsVue from "../../components/teacherDashboard/upcommingAppoinments.vue";
export default {
  components: {
    created_slots: createdSlotsVue,
  },
};
</script>

<style></style>