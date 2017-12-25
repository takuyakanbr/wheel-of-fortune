
import { getAvailable } from '../data'
import { saveOptions, savePresets } from '../data/storage'
import { deepClone } from '../util'

export const addPrize = (state, prize) => {
  state.options.prizes.push(prize)
}

// Add the prize at the given index to the records.
export const addSpinResult = (state, index) => {
  state.totalSpins++
  state.spins++
  state.lastResult = index
  state.records.push(state.available[index].name)
}

export const hideOptions = state => {
  state.showOptions = false
}

export const loadPreset = (state, data) => {
  if (data) {
    state.options = deepClone(data)
  }
}

export const removePreset = (state, index) => {
  state.presets.splice(index, 1)
  savePresets(state.presets)
}

export const removePrize = (state, index) => {
  state.options.prizes.splice(index, 1)
}

// Save current wheel data to storage, and reset the wheel.
export const saveAndReset = state => {
  state.spins = 0
  state.lastResult = -1
  state.records = []
  state.data = deepClone(state.options)
  state.available = deepClone(getAvailable(state.data.prizes))
  saveOptions(state.options)
}

export const saveNewPreset = (state, name) => {
  state.presets.push({ name, data: deepClone(state.data) })
  savePresets(state.presets)
}

export const savePreset = (state, index) => {
  state.presets[index].data = deepClone(state.data)
  savePresets(state.presets)
}

export const showOptions = state => {
  state.showOptions = true
}

// If removeWinning is set to true, make the last spin result unavailable.
export const updateAvailable = state => {
  if (state.lastResult !== -1 && state.data.removeWinning) {
    state.available.splice(state.lastResult, 1)
  }
}

export const updateWheelSize = (state, size) => {
  state.size = size
}
