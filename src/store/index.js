import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

import { getAvailable } from '../data'
import { PRESET3 } from '../data/presets'
import { loadOptions, loadPresets } from '../data/storage'
import { deepClone } from '../util'

Vue.use(Vuex)

// Load options. If unavailable, use default preset.
let options = loadOptions()
if (!options) {
  options = deepClone(PRESET3)
}

const data = deepClone(options)

const state = {
  totalSpins: 0,
  spins: 0,
  lastResult: -1,
  showOptions: false,
  size: 0,
  options,
  data,
  available: deepClone(getAvailable(data.prizes)),
  records: [],
  presets: loadPresets()
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
