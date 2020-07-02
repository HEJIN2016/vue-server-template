import Vue from 'vue'
import App from './App'
import router from './router'

import cookie from 'js-cookie'
import moment from 'moment'
import axios from './js/axios'
import { Button } from 'view-design'

import './style/main.less'
import './style/test.scss'

Vue.prototype.$Cookie = cookie;
Vue.prototype.$Moment = moment;
Vue.prototype.$Axios = axios;

Vue.component("Button", Button);

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app');
