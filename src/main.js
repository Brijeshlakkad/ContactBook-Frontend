import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

// import 'bootstrap'

import 'bootstrap/dist/css/bootstrap.css'

import 'jquery/dist/jquery'
import 'bootstrap/dist/js/bootstrap.js'
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')