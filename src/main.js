import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

// Custom directive to autofocus when element is added.
Vue.directive('focus', {
  inserted: function(el) {
    el.focus()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
