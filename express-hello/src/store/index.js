import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
   
import user from './user'
import main from './main'

const store = new Vuex.Store({
    modules: {
        user,
        main
    }
})

export default store