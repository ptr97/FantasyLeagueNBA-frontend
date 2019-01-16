// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VeeValidate from 'vee-validate'

Vue.config.productionTip = false

Vue.use(VeeValidate)

window.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3000/api'

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<app/>'
})
