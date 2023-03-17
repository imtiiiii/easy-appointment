<template>
  <div>
    <div id="main-wrapper">
      <div>
        <h5 style="text-align:center;">
          See Created Slots
        </h5>
        <div>
          <created_slots></created_slots>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createdSlotsVue from "../../components/teacherDashboard/createdSlots.vue";
export default {
  components: {
    created_slots: createdSlotsVue,
  },
};
</script>

<style></style>