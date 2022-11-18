<template>
  <app-loader v-if="loading"></app-loader>

  <app-page back title="Заявка" v-else-if="request">
    <p><strong>Имя владельца</strong>: {{ request.fio }}</p>
    <p><strong>Телефон</strong>: {{ request.phone }}</p>
    <p><strong>Сумма</strong>: {{ currencyFormatter(request.amount) }}</p>
    <p><strong>Статус</strong>:
      <app-status :type="request.status"/>
    </p>

    <app-select v-model="status"></app-select>

    <button class="btn danger" @click="remove">удалить</button>
    <button v-if="hasChanged" class="btn" @click="update">обновить</button>
  </app-page>

  <h3 class="text-center text-white" v-else>Заявки с ID = {{ id }} нет</h3>
</template>

<script>
import {computed, onMounted, ref} from "vue"
import {useStore} from "vuex"
import {useRoute, useRouter} from "vue-router"
import {currencyFormatter} from "@/utils/currency-formatter"
import AppPage from "@/components/ui/AppPage"
import AppLoader from "@/components/ui/AppLoader"
import AppStatus from "@/components/ui/AppStatus"
import AppSelect from "@/components/ui/AppSelect"

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const loading = ref(true)
    const request = ref({})
    const id = route.params.id
    const status = ref()

    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch("request/loadById", id)
      status.value = request.value?.status
      loading.value = false
    })

    const hasChanged = computed(() => request.value.status !== status.value)

    const remove = async () => {
      await store.dispatch("request/removeById", id)
      await router.push('/')
    }

    const update = async () => {
      const data = {...request.value, status: status.value, id}
      await store.dispatch("request/updateById", data)
      request.value.status = status.value
    }

    return {
      loading,
      request,
      id,
      currencyFormatter,
      remove,
      update,
      status,
      hasChanged
    }
  },
  components: {AppPage, AppLoader, AppStatus, AppSelect}
}
</script>

<style scoped>

</style>
