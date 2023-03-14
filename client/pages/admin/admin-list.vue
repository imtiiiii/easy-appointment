<template>
    <div>
        <h5 style="text-align: center;">View admin list</h5>
        <admin-list></admin-list>
    </div>
  
</template>

<script>
import adminListVue from '~/components/adminDashboard/adminList.vue'
export default {
    components: {
        "admin-list": adminListVue,
    }

}
</script>

<style>

</style>