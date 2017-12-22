
export const DEFAULT_FREQUENCY = 4

// Returns a list containing the prizes that can be won.
export const getAvailable = prizes => {
  const list = []
  prizes.forEach(prize => {
    if (!prize.hide) {
      list.push(prize)
    }
  })
  return list
}

// Returns the total frequency of the list of prizes.
export const getTotalFrequency = prizes => {
  let count = 0
  prizes.forEach(prize => {
    count += prize.freq || DEFAULT_FREQUENCY
  })
  return count
}
