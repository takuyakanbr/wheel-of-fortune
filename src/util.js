
// Clone the given object by converting it to JSON and back again.
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj))

// Returns a random integer between min (inclusive) and max (exclusive).
export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
