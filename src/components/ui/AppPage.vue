<template>

  <div class="breadcrumbs">
    <router-link to="/" v-if="back" class="text-white">Вернуться к списку заявок</router-link>
  </div>

  <div class="card">
    <h1 class="card-title">
      {{ title }}
      <slot name="header"/>
    </h1>

    <slot/>

  </div>

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    document.title = `${props.title} | Online Bank`
    return {}
  }
}
</script>

<style scoped>

</style>
