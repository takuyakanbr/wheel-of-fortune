
function isSupported(type) {
  try {
    const storage = window[type]
    const x = '_storage_test_'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return false
  }
}

function setItem(storage, key, value) {
  try {
    storage.setItem(key, value)
  } catch (e) {
  }
}

const storage = isSupported('localStorage') ? window.localStorage : window.sessionStorage

export const loadPresets = () => {
  const presets = []
  let names = storage.getItem('wofPresets')
  if (names) {
    try {
      names = JSON.parse(names)
      for (let i = 0; i < names.length; ++i) {
        let presetData = storage.getItem('wofPresetData' + i)
        presetData = JSON.parse(presetData)
        presets.push({ name: names[i], data: presetData })
      }
    } catch (e) {
      console.error('Error loading presets: ' + e)
    }
  }
  return presets
}

export const loadWheelData = () => {
  let wheelData = storage.getItem('wofWheelData')
  if (wheelData) {
    try {
      wheelData = JSON.parse(wheelData)
    } catch (e) {
      wheelData = null
      console.error('Error loading wheel data: ' + e)
    }
  }
  return wheelData
}

export const savePresets = (presets) => {
  const names = []
  for (let i = 0; i < presets.length; ++i) {
    const preset = presets[i]
    names.push(preset.name)
    setItem(storage, 'wofPresetData' + i, JSON.stringify(preset.data))
  }
  setItem(storage, 'wofPresets', JSON.stringify(names))
}

export const saveWheelData = (data) => {
  setItem(storage, 'wofWheelData', JSON.stringify(data))
}
