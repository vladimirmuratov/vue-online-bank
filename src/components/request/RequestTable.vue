<template>
  <h4 class="text-center" v-if="!requests.length">Заявок пока нет</h4>

  <table v-else class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>ФИО</th>
      <th>Телефон</th>
      <th>Сумма</th>
      <th>Статус</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
    <tr :key="r.id" v-for="(r, idx) in requests">
      <td>{{ idx + 1 }}</td>
      <td>{{ r.fio }}</td>
      <td>{{ r.phone }}</td>
      <td>{{ currencyFormatter(r.amount, null) }}</td>
      <td>
        <AppStatus :type="r.status"/>
      </td>
      <td>
        <router-link v-slot="{navigate}" custom :to="{name: 'Request', params: {id: r.id}}">
          <button class="btn" @click="navigate">Открыть</button>
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {currencyFormatter} from "@/utils/currency-formatter"
import AppStatus from "@/components/ui/AppStatus"

export default {
  props: ['requests'],
  setup() {

    return {
      currencyFormatter
    }
  },
  components: {AppStatus}
}
</script>

<style scoped>

</style>
