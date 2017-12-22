
export const addPrize = (state, prize) => {
  state.data.prizes.push(prize)
}

// Add the prize at the given index to the records.
export const addResult = (state, index) => {
  state.lastResult = index
  state.record.push(state.available[index].name)
}

export const hideOptions = state => {
  state.showOptions = false
}

// If removeWinning is set to true, remove the previous result, if any.
export const removePreviousResult = state => {
  if (state.lastResult !== -1 && state.data.removeWinning) {
    state.available.splice(state.lastResult, 1)
  }
}

export const removePrize = (state, index) => {
  state.data.prizes.splice(index, 1)
}

export const showOptions = state => {
  state.showOptions = true
}
