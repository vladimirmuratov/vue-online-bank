import axios from "axios"
import {error} from "@/utils/error";

const TOKEN_KEY = 'jwt-token'

export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY),
            status: 'login'
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuth(_, getters) {
            return !!getters.token
        },
        status(state) {
            return state.status
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        logout(state) {
            state.token = null
            localStorage.removeItem(TOKEN_KEY)
        },
        changeStatus(state) {
            if (state.status === 'login') {
                state.status = 'register'
            } else {
                state.status = 'login'
            }
        }
    },
    actions: {
        async login(context, payload) {
            try {
                const urlParam = context.state.status === 'login' ? 'signInWithPassword' : 'signUp'
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:${urlParam}?key=${process.env.VUE_APP_FB_KEY}`

                const {data} = await axios.post(url, {...payload, returnSecureToken: true})
                context.commit('setToken', data['idToken'])
                context.commit('clearMessage', null, {root: true})
            } catch (e) {
                await context.dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                console.log(error(e.response.data.error.message))
                throw new Error()
            }

        }
    }
}
