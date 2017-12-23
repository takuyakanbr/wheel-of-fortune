import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

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
