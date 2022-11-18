<template>
  <TheNavbar/>
  <TheSidebar/>
  <div class="container with-nav">
    <AppMessage/>
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar"
import AppMessage from "@/components/ui/AppMessage"
import TheSidebar from "@/components/TheSidebar"

export default {
  components: {TheNavbar, AppMessage, TheSidebar}
}
</script>

<style scoped>

</style>
