import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

import { getAvailable } from '../data'
import { PRESET3 } from '../data/presets'
import { deepClone } from '../util'

Vue.use(Vuex)

const data = deepClone(PRESET3)

const state = {
  totalSpins: 0,
  spins: 0,
  lastResult: -1,
  showOptions: false,
  data,
  available: getAvailable(data.prizes),
  record: []
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

export default store
