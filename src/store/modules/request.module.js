import axios from "@/axios/request"
import store from "@/store"

export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },

    getters: {
        requests(state) {
            return state.requests
        }
    },

    mutations: {
        setRequests(state, requests) {
            state.requests = requests
        },
        addRequest(state, request) {
            state.requests.push(request)
        }
    },

    actions: {
        async create(context, payload) {
            try {
                const token = store.getters["auth/token"]

                const {data} = await axios.post(`/requests.json?auth=${token}`, payload)

                context.commit("addRequest", {...payload, id: data.name})

                await context.dispatch('setMessage', {
                    value: 'Заявка успешно создана',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                await context.dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async load(context) {
            try {
                const token = store.getters["auth/token"]

                const {data} = await axios.get(`/requests.json?auth=${token}`)

                const requests = Object.keys(data).map(id => ({...data[id], id}))

                context.commit("setRequests", requests)

            } catch (e) {
                await context.dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async loadById(context, id) {
            try {
                const token = store.getters["auth/token"]

                const {data} = await axios.get(`/requests/${id}.json?auth=${token}`)

                return data

            } catch (e) {
                await context.dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async removeById(context, id) {
            try {
                const token = store.getters["auth/token"]

                await axios.delete(`/requests/${id}.json?auth=${token}`)

                await context.dispatch('setMessage', {
                    value: 'Заявка удалена',
                    type: 'primary'
                }, {root: true})

            } catch (e) {
                await context.dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async updateById(context, request) {
            try {
                const token = store.getters["auth/token"]

                await axios.put(`/requests/${request.id}.json?auth=${token}`, {
                    fio: request.fio,
                    phone: request.phone,
                    amount: request.amount,
                    status: request.status
                })

                await context.dispatch('setMessage', {
                    value: 'Заявка обновлена',
                    type: 'primary'
                }, {root: true})

            } catch (e) {
                await context.dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        }
    }
}
