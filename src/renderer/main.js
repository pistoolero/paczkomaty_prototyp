import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'
import vBTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip'
import {
  Alert,
  Modal,
  Card,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  FormInput,
  Navbar,
  Collapse,
  Dropdown,
  Tooltip,
  Progress,
  Table,
  Jumbotron,
  Badge,
  Pagination,
  Layout,
  Popover
} from 'bootstrap-vue/es/components'
import VueGoogleMaps from 'vue-googlemaps'
import 'vue-googlemaps/dist/vue-googlemaps.css'
import 'vue2-animate/dist/vue2-animate.min.css'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    // Google API key
    apiKey: 'AIzaSyC1vgPWW-sFV66O2TDVfKw5FUIpImqPzFo',
    // Enable more Google Maps libraries here
    libraries: ['places'],
    // Use new renderer
    useBetaRenderer: false
  }
})
Vue.use(BootstrapVue)
Vue.use(Alert)
Vue.use(Modal)
Vue.use(Popover)
Vue.use(Layout)
Vue.use(Pagination)
Vue.use(Badge)
Vue.use(Jumbotron)
Vue.use(Table)
Vue.use(Progress)
Vue.use(Tooltip)
Vue.use(Dropdown)
Vue.use(Collapse)
Vue.use(Navbar)
Vue.use(FormInput)
Vue.use(FormGroup)
Vue.use(Form)
Vue.use(ButtonGroup)
Vue.use(Button)
Vue.use(Card)
Vue.directive('b-tooltip', vBTooltip)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
