<template>
  <form @submit.prevent="onSubmit">

    <div class="form-control" :class="{invalid: fioError}">
      <label for="fio">ФИО</label>
      <input type="text" id="fio" v-model="fio" @blur="fioBlur"/>
      <small v-if="fioError">{{ fioError }}</small>
    </div>

    <div :class="['form-control', {invalid: phoneError}]">
      <label for="phone">Телефон</label>
      <input type="text" id="phone" v-model="phone" @blur="phoneBlur"/>
      <small v-if="phoneError">{{ phoneError }}</small>
    </div>

    <div :class="['form-control', {invalid: amountError}]">
      <label for="amount">Сумма</label>
      <input type="number" id="amount" v-model.number="amount" @blur="amountBlur"/>
      <small v-if="amountError">{{ amountError }}</small>
    </div>

    <app-select v-model="status"></app-select>

    <button type="submit" class="btn primary" :disabled="isSubmitting">создать</button>

  </form>
</template>

<script>
import {useRequestForm} from "@/hooks/request-form"
import {useStore} from "vuex"
import AppSelect from "@/components/ui/AppSelect"

export default {
  emits: ['created'],
  setup(props, context) {

    const store = useStore()

    const submit = async (values) => {
      await store.dispatch("request/create", values)
      context.emit('created')
    }

    return {...useRequestForm(submit)}
  },
  components: {AppSelect}
}
</script>

<style scoped>

</style>
