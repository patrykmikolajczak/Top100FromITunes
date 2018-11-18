import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import axios from 'axios'
import toastr from 'toastr'
import Vlf from 'vlf'
import VeeValidate from 'vee-validate'

// Vue use
Vue.use(Vlf)
Vue.use(VeeValidate);

// Vue prototype
Vue.prototype.$http = axios
Vue.prototype.$toastr = toastr

// Other config
toastr.options = {
  "closeButton": true,
  "debug": false,
  "progressBar": true,
  "preventDuplicates": false,
  "positionClass": "toast-top-right",
  "onclick": null,
  "showDuration": "400",
  "hideDuration": "1000",
  "timeOut": "7000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

import './assets/css/app.scss'

Vue.config.productionTip = false
Vue.config.performance = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
