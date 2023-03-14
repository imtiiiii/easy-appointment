<template>
    <div>
        <h5 style="text-align: center;">View teacher list</h5>
        <teacher-list></teacher-list>
    </div>
  
</template>

<script>
import teacherListVue from '~/components/adminDashboard/teacherList.vue'
export default {
    components: {
        "teacher-list": teacherListVue,
    }

}
</script>

<style>

</style>