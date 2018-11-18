import Vue from 'vue'
import Vuex from 'vuex'

import App from './app'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        App
    },
    strict: debug
})

export default store