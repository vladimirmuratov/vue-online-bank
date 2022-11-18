import {createStore, createLogger} from 'vuex'
import auth from "./modules/auth.module"
import request from "./modules/request.module"

const plugins = []

if (process.env.NODE_ENV === 'development') {
    plugins.push(createLogger())
}

export default createStore({
    plugins,
    state() {
        return {
            message: null,
            sidebar: false
        }
    },
    mutations: {
        setMessage(state, message) {
            state.message = message
        },
        clearMessage(state) {
            state.message = null
        },
        openSidebar(state) {
            state.sidebar = true
        },
        closeSidebar(state) {
            state.sidebar = false
        }
    },
    actions: {
        setMessage(context, message) {
            let timer
            context.commit("setMessage", message)
            timer = setTimeout(() => context.commit("clearMessage"), 5000)

            return () => {
                clearTimeout(timer)
            }
        }
    },
    modules: {
        auth,
        request
    }
})
