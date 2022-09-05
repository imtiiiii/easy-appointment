<template>
  <div style="margin: 100px padding:100px 0px"></div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  async mounted() {
    window.location = "/home";
  },
};
</script>

<style scoped></style>