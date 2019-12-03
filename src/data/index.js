import { DEFAULT_PRESETS } from './presets';

const COLORS = ['#ef9a9a', '#FFF59D', '#80CBC4', '#F48FB1', '#FFCC80', '#81D4FA', '#B39DDB', '#C5E1A5'];
const NUM_COLORS = COLORS.length;

export const DEFAULT_FREQUENCY = 4;
export const DEFAULT_TEXT_COLOR = '#333';

export const createNewPrize = () => ({ name: '', freq: 4, bg: '', text: '', hide: false, fontMod: 1 });

// Returns a list containing the prizes that can be won.
export const getAvailable = prizes => {
  const list = [];
  prizes.forEach(prize => {
    if (!prize.hide) {
      list.push(prize);
    }
  });
  return list;
};

// Returns the default background color given the prize index.
export const getDefaultBgColor = index => COLORS[index % NUM_COLORS];

export const getInitialPreset = (param, presets) => {
  const index = parseInt(param);

  // Use a default (built-in) preset.
  if (index > 0 && index <= DEFAULT_PRESETS.length) {
    return DEFAULT_PRESETS[index - 1];
  }

  // Use a user preset.
  const preset = presets[index - 1 - DEFAULT_PRESETS.length];
  return preset ? preset.data : null;
};

// Returns the total frequency of the list of prizes.
export const getTotalFrequency = prizes => {
  let count = 0;
  prizes.forEach(prize => {
    count += prize.freq || DEFAULT_FREQUENCY;
  });
  return count;
};
