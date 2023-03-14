<template>
    <div>
        <h5 style="text-align: center;">View student list</h5>
        <student-list></student-list>
    </div>
  
</template>

<script>
import studentListVue from '~/components/adminDashboard/studentList.vue'
export default {
    components: {
        "student-list": studentListVue,
    }

}
</script>

<style>

</style>