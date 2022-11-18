<template>
  <app-page back title="Помощь">
    <question-item :key="q.title" v-for="q in questions" :question="q"></question-item>
  </app-page>
</template>
<script>
import AppPage from "@/components/ui/AppPage"
import QuestionItem from "@/components/question/QuestionItem"

export default {
  setup() {
    const questions = [
      {
        title: 'Что есть в данной системе?',
        text: 'Тут есть все, для того, чтобы смотреть, какие заявки человек добавлял'
      },
      {
        title: 'Как тут работает авторизация?',
        text: 'Все реализовано через Firebase. Ключ доступа валиден один час. По истечении часа будет предложено войти в систему по новой'
      }
    ]

    return {questions}
  },
  components: {AppPage, QuestionItem}
}
</script>
