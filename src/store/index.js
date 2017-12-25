import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

import { getAvailable, getInitialPreset } from '../data'
import { PRESET1 } from '../data/presets'
import { loadOptions, loadPresets } from '../data/storage'
import { deepClone, getParameterByName } from '../util'

Vue.use(Vuex)

// Load options. If unavailable, use default preset.
let options = loadOptions()
if (!options) {
  options = deepClone(PRESET1)
}

const presets = loadPresets()

// Use the preset specified by the parameter, if any.
const initial = getInitialPreset(getParameterByName('preset'), presets)
const data = initial ? deepClone(initial) : deepClone(options)

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
  presets
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
