<template>
  <div class="filter">

    <div class="form-control">
      <input type="text" placeholder="Начните ввод имени" v-model="name"/>
    </div>

    <div class="form-control">
      <select v-model="status">
        <option disabled selected>Выберите статус</option>
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button v-if="isActive" class="btn warning" @click="reset">очистить</button>
  </div>
</template>

<script>
import {computed, ref, watch} from "vue"

export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(props, context) {
    const name = ref()
    const status = ref()

    watch([name, status], values => {
      context.emit('update:modelValue', {
        name: values[0],
        status: values[1]
      })
    })

    const isActive = computed(() => name.value || status.value)

    return {
      name,
      status,
      isActive,
      reset: () => {
        name.value = ''
        status.value = null
      }
    }
  }
}
</script>

<style scoped>

</style>
