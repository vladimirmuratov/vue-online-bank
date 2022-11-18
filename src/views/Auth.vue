<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1 v-if="status === 'login'">Войти в систему</h1>
    <h1 v-if="status === 'register'">Регистрация</h1>

    <div :class="['form-control', {invalid: eError}]">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="email" @blur="eBlur"/>
      <small v-if="eError">{{ eError }}</small>
    </div>

    <div :class="['form-control', {invalid: pError}]">
      <label for="password">Пароль</label>
      <input type="password" id="password" v-model="password" @blur="pBlur"/>
      <small v-if="pError">{{ pError }}</small>
    </div>

    <button class="btn primary" type="submit" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
    <div class="text-danger" v-if="isTooManyAttempts">Вы слишком часто пытаетесь войти в систему</div>
    <p class="footer_link" v-if="status === 'login'" @click="changeStatus">Еще не зарегистрированы?
      <span>Регистрация</span></p>
    <p class="footer_link" v-if="status === 'register'" @click="changeStatus">Уже зарегистрированы? <span>Войти</span>
    </p>
  </form>
</template>

<script>
import {useLoginForm} from "@/hooks/login-form"
import {useRoute} from "vue-router"
import {useStore} from "vuex"
import {error} from "@/utils/error"
import {computed} from "vue"

export default {
  setup() {
    const route = useRoute()
    const store = useStore()
    const status = computed(() => store.getters["auth/status"])

    if (route.query.message) {
      store.dispatch("setMessage", {
        type: 'warning',
        value: error(route.query.message)
      })
    }

    function changeStatus() {
      store.commit("auth/changeStatus")
    }

    return {
      ...useLoginForm(),
      status,
      changeStatus
    }
  }
}
</script>
<style scoped>
.footer_link {
  color: #222;
  line-height: 1.7;
}

.footer_link span {
  color: dodgerblue;
  cursor: pointer;
}

.footer_link span:hover {
  text-decoration: underline;
}

</style>
