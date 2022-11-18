<template>
  <div class="form-control">
    <label for="status">Статус</label>
    <select id="status" v-model="value">
      <option value="done">Завершен</option>
      <option value="cancelled">Отменен</option>
      <option value="active">Активен</option>
      <option value="pending">Выполняется</option>
    </select>
  </div>
</template>

<script>

import {computed} from "vue"

export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(props, context) {
    const value = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        context.emit('update:modelValue', value)
      }
    })

    return {
      value
    }
  }
}
</script>

<style scoped>

</style>
