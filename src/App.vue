<template>
  <component :is="layout + '-layout'" v-if="layout"/>
</template>

<script>
import MainLayout from "@/layouts/MainLayout"
import AuthLayout from "@/layouts/AuthLayout"
import {useRoute} from "vue-router"
import {computed} from "vue"

export default {
  setup() {
    const route = useRoute()
    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: {MainLayout, AuthLayout}
}
</script>
