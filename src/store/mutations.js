
import { getAvailable } from '../data'
import { savePresets, saveWheelData } from '../data/storage'

export const addPrize = (state, prize) => {
  state.data.prizes.push(prize)
}

// Add the prize at the given index to the records.
export const addSpinResult = (state, index) => {
  state.totalSpins++
  state.spins++
  state.lastResult = index
  state.record.push(state.available[index].name)
}

export const hideOptions = state => {
  state.showOptions = false
}

export const removePrize = (state, index) => {
  state.data.prizes.splice(index, 1)
}

// Save current wheel data to storage, and reset the wheel.
export const saveAndReset = state => {
  state.spins = 0
  state.lastResult = -1
  state.available = getAvailable(state.data.prizes)
  state.record = []
  saveWheelData(state.data)
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
