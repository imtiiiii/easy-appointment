<template>
  <div style="margin: 100px padding:100px 0px"></div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      user: null,
    };
  },
  async mounted() {},
};
</script>

<style scoped></style>
