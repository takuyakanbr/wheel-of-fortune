'use strict'

// The wheel used in the game show 'Wheel of Fortune'.
export const PRESET1 = {
  name: 'Wheel of Fortune',
  winningText: 'Result: %s',
  background: '',
  removeWinning: false,
  prizes: [
    { name: '$550', freq: 3, bg: 'purple', text: 'black', hide: false },
    { name: '$400', freq: 3, bg: 'yellow', text: 'black', hide: false },
    { name: '$300', freq: 3, bg: 'pink', text: 'black', hide: false },
    { name: '$900', freq: 3, bg: 'red', text: 'black', hide: false },
    { name: '$500', freq: 3, bg: 'orange', text: 'black', hide: false },
    { name: '$300', freq: 3, bg: 'teal', text: 'black', hide: false },
    { name: '$900', freq: 3, bg: 'orange', text: 'black', hide: false },
    { name: 'BANKRUPT', freq: 3, bg: 'black', text: 'white', hide: false },
    { name: '$600', freq: 3, bg: 'purple', text: 'black', hide: false },
    { name: '$400', freq: 3, bg: 'yellow', text: 'black', hide: false },
    { name: '$300', freq: 3, bg: 'pink', text: 'black', hide: false },
    { name: 'LOSE A TURN', freq: 3, bg: 'white', text: 'black', hide: false },
    { name: '$800', freq: 3, bg: 'red', text: 'black', hide: false },
    { name: '$350', freq: 3, bg: 'purple', text: 'black', hide: false },
    { name: '$450', freq: 3, bg: 'pink', text: 'black', hide: false },
    { name: '$700', freq: 3, bg: 'teal', text: 'black', hide: false },
    { name: '$300', freq: 3, bg: 'orange', text: 'black', hide: false },
    { name: '$600', freq: 3, bg: 'purple', text: 'black', hide: false },
    { name: '$2500', freq: 3, bg: 'lightblue', text: 'black', hide: false },
    { name: '$300', freq: 3, bg: 'yellow', text: 'black', hide: false },
    { name: '$600', freq: 3, bg: 'red', text: 'black', hide: false },
    { name: '$300', freq: 3, bg: 'orange', text: 'black', hide: false },
    { name: '$500', freq: 3, bg: 'teal', text: 'black', hide: false },
    { name: 'BANKRUPT', freq: 1, bg: 'black', text: 'white', hide: false },
    { name: '$10000', freq: 1, bg: 'gold', text: 'black', hide: false },
    { name: 'BANKRUPT', freq: 1, bg: 'black', text: 'white', hide: false }
  ]
}

// Wheel of Misfortune: SMRT disruption edition.
export const PRESET2 = {
  name: 'Wheel of Misfortune',
  winningText: 'Congratulations! You win: %s!',
  background: '',
  removeWinning: false,
  prizes: [
    { name: 'Track Fault', freq: 4, bg: 'pink', text: 'black' },
    { name: 'Tunnel Ponding', freq: 4, bg: 'orange', text: 'black', hide: false },
    { name: 'Delay 60 mins', freq: 4, bg: 'blue', text: 'black', hide: false },
    { name: 'Lightning Fault', freq: 4, bg: 'purple', text: 'black', hide: false },
    { name: 'Delay 10 mins', freq: 4, bg: 'blanchedalmond', text: 'black', hide: false },
    { name: 'No Service', freq: 4, bg: 'lightgray', text: 'black', hide: false },
    { name: 'Delay 40 mins', freq: 4, bg: 'blue', text: 'black', hide: false },
    { name: 'Full-day Closure', freq: 4, bg: 'red', text: 'black', hide: false },
    { name: 'Train Fault', freq: 4, bg: 'white', text: 'black', hide: false },
    { name: 'Delay 20 mins', freq: 4, bg: 'blue', text: 'black', hide: false },
    { name: 'Signal Fault', freq: 4, bg: 'peru', text: 'black', hide: false },
    { name: 'Delay 10 mins', freq: 4, bg: 'blanchedalmond', text: 'black', hide: false },
    { name: 'No Delay', freq: 1, bg: 'black', text: 'white', hide: false },
    { name: 'Collision', freq: 2, bg: 'teal', text: 'black', hide: false },
    { name: 'No Delay', freq: 1, bg: 'black', text: 'white', hide: false }
  ]
}

export const PRESET3 = {
  name: '???'
}
