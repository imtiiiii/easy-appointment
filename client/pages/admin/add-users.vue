<template>
  <div>
    <div id="main-wrapper">
      <div style="margin: 100px 0px">
        <h5 style="text-align: center">Add Users from Admin</h5>
        <div>
            <register></register>
       
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Register from '~/components/register.vue';


export default {
    components: {
    register: Register,
   
  },
};
</script>

<style></style>
