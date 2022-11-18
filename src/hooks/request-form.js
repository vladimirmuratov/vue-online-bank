import {useField, useForm} from "vee-validate"
import * as yup from "yup"

export function useRequestForm(fn) {
    const {handleSubmit, isSubmitting} = useForm({
        initialValues: {
            status: 'active'
        }
    })

    const {value: fio, errorMessage: fioError, handleBlur: fioBlur} = useField(
        'fio',
        yup
            .string()
            .trim()
            .required('Поле ФИО обязательно')
    )

    const {value: phone, errorMessage: phoneError, handleBlur: phoneBlur} = useField(
        'phone',
        yup
            .string()
            .trim()
            .required('Поле Телефон обязательно')
    )

    const {value: amount, errorMessage: amountError, handleBlur: amountBlur} = useField(
        'amount',
        yup
            .number()
            .min(0, 'Сумма не может быть меньше нуля')
            .required('Поле Сумма обязательно')
    )

    const {value: status} = useField('status')

    const onSubmit = handleSubmit(fn)

    return {
        onSubmit,
        isSubmitting,
        fio,
        fioError,
        fioBlur,
        phone,
        phoneError,
        phoneBlur,
        amount,
        amountError,
        amountBlur,
        status
    }
}
