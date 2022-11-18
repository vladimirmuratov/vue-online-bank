import {useField, useForm} from "vee-validate"
import * as yup from "yup"
import {computed, watch} from "vue"
import {useStore} from "vuex"
import {useRouter} from "vue-router"

export function useLoginForm() {
    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting, submitCount} = useForm()
    const PASSWORD_MIN_LENGTH = 6

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup
            .string()
            .trim()
            .required('Поле email обязательно')
            .email('Невалидный email')
    )
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Поле password обязательно')
            .min(PASSWORD_MIN_LENGTH, `Длина пароля не менее ${PASSWORD_MIN_LENGTH} символов`)
    )

    const onSubmit = handleSubmit(async (values) => {
        try {
            await store.dispatch('auth/login', values)
            await router.push({name: 'Home'})
        } catch (e) {
        }
    })

    const isTooManyAttempts = computed(() => submitCount.value >= 3)

    watch(isTooManyAttempts, val => {
        let timer
        if (val) {
            timer = setTimeout(() => submitCount.value = 0, 1500)
        }
        return () => {
            clearTimeout(timer)
        }
    })

    return {
        email,
        eError,
        eBlur,
        password,
        pError,
        pBlur,
        onSubmit,
        isSubmitting,
        isTooManyAttempts
    }
}
