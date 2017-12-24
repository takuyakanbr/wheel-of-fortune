<template>
  <div class="wheel-area">
    <canvas class="wheel" ref="canvas"></canvas>
  </div>
</template>

<script>
  import { DEFAULT_FREQUENCY, DEFAULT_TEXT_COLOR, getDefaultBgColor, getTotalFrequency } from '../data'
  import { getRandomInt } from '../util'
  
  // Calculate the resulting prize index given the final angle and list of prizes.
  function calculateResult(angle, prizes) {
    const totalFreqs = getTotalFrequency(prizes)
    let cumulative = 0
    let winner = -1

    for (let i = 0; i < prizes.length; ++i) {
      const freq = prizes[i].freq || DEFAULT_FREQUENCY
      cumulative += freq

      const arcAngle1 = angle + 2 * Math.PI * (cumulative - freq) / totalFreqs
      const arcAngle2 = angle + 2 * Math.PI * cumulative / totalFreqs
      if (isAngleBetween(3 / 2 * Math.PI, arcAngle1, arcAngle2)) {
        winner = i
      }
    }

    return winner
  }

  // Returns true if the given angle is between the specified bounds.
  function isAngleBetween(angle, lower, upper) {
    lower %= 2 * Math.PI
    upper %= 2 * Math.PI
    if (lower <= upper) {
      return (lower < angle) && (upper >= angle)
    } else {
      return (lower < angle) || (upper >= angle)
    }
  }

  // Redraw the wheel onto the canvas, with the given offset angle and list of prizes.
  function redraw(canvas, angle, prizes) {
    const r = Math.min(canvas.width, canvas.height) / 2.05
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, 'rgba(0,0,0,0)')
    g.addColorStop(1, 'rgba(0,0,0,0.1)')

    const totalFreqs = getTotalFrequency(prizes)
    let cumulative = 0
    for (let i = 0; i < prizes.length; ++i) {
      const prize = prizes[i]
      const freq = prize.freq || DEFAULT_FREQUENCY
      cumulative += freq

      // calculate arc and text angles
      const arcAngle1 = angle + 2 * Math.PI * (cumulative - freq) / totalFreqs
      const arcAngle2 = angle + 2 * Math.PI * cumulative / totalFreqs
      const textAngle = angle + 2 * Math.PI * (cumulative - freq / 2) / totalFreqs
      const highlight = isAngleBetween(3 / 2 * Math.PI, arcAngle1, arcAngle2)

      // draw arc
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, arcAngle1, arcAngle2, false)
      ctx.fillStyle = prize.bg || getDefaultBgColor(i)
      ctx.fill()
      ctx.fillStyle = g
      ctx.fill()
      ctx.save()

      // calculate font size
      const angleMod = Math.min(arcAngle2 - arcAngle1, 0.25)
      const lengthMod = 1 - Math.round(prize.name.length / 3) * 0.07
      const fontMod = prize.fontMod || 1
      const fontSize = Math.max(10, 0.4 * r * angleMod * lengthMod * fontMod)

      // draw text
      ctx.fillStyle = prize.text || DEFAULT_TEXT_COLOR
      if (highlight) {
        ctx.shadowColor = prize.text || DEFAULT_TEXT_COLOR
        ctx.shadowBlur = r / 15
      }
      ctx.font = fontSize + 'px \'Muli\', sans-serif'
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      ctx.translate(cx, cy)
      ctx.rotate(textAngle)
      ctx.fillText(prize.name, r * 0.91, 0)
      ctx.restore()
    }

    // outer ring
    ctx.save()
    ctx.shadowOffsetX = r / 100
    ctx.shadowOffsetY = r / 100
    ctx.shadowBlur = r / 40
    ctx.shadowColor = 'rgba(0,0,0,0.2)'
    ctx.beginPath()
    ctx.arc(cx, cy, r * 1.005, 0, 2 * Math.PI, true)
    ctx.arc(cx, cy, r * 0.985, 0, 2 * Math.PI, false)
    ctx.fillStyle = '#424242'
    ctx.fill()

    // center ring
    ctx.shadowOffsetX = r / 100
    ctx.shadowOffsetY = r / 100
    ctx.fillStyle = '#424242'
    ctx.beginPath()
    ctx.arc(cx, cy, r / 30, 0, 2 * Math.PI, false)
    ctx.fill()

    // prize pointer
    ctx.translate(cx, cy)
    ctx.rotate(Math.PI / 2)
    ctx.beginPath()
    ctx.moveTo(-r * 1.010, -r * 0.05)
    ctx.lineTo(-r * 0.935, 0)
    ctx.lineTo(-r * 1.010, r * 0.05)
    ctx.fillStyle = '#f44336'
    ctx.fill()
    ctx.restore()
  }

  // Render the contents of the offscreen canvas onto the given canvas.
  function render(offscreen, canvas) {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(offscreen, 0, 0)
  }

  export default {
    name: 'Wheel',
    data() {
      return {
        angle: 0,
        resizeIntervalId: null
      }
    },
    computed: {
      prizes() {
        return this.$store.state.available
      },
      removeWinning() {
        return this.$store.state.data.removeWinning || false
      }
    },
    methods: {
      // Resize and repaint the wheel if the size of the canvas changes.
      resize() {
        const offscreen = this.offscreen
        const canvas = this.$refs.canvas
        if (canvas.height !== canvas.offsetHeight || canvas.width !== canvas.offsetWidth) {
          canvas.width = canvas.offsetWidth
          canvas.height = canvas.offsetHeight
          offscreen.width = canvas.offsetWidth
          offscreen.height = canvas.offsetHeight
          this.$emit('resize', Math.min(canvas.width, canvas.height))
          window.requestAnimationFrame(() => {
            redraw(offscreen, this.angle, this.prizes)
            render(offscreen, canvas)
          })
        }
      },

      // Determine the winner and notify parent.
      spinCompleted() {
        const winner = calculateResult(this.angle, this.prizes)
        this.$store.commit('addSpinResult', winner)
        this.$emit('result', winner)
      },

      // Start spinning. Called by parent (WheelPanel).
      startSpin() {
        this.$store.commit('updateAvailable')

        const duration = getRandomInt(4700, 5300)
        const speed = 0.2 + getRandomInt(0, 150) * 0.001

        const canvas = this.$refs.canvas
        const prizes = this.prizes
        const start = +new Date()
        const self = this

        function frame() {
          const now = +new Date()
          let t = (now - start) / duration
          if (t > 1) t = 1
          self.angle += speed * (1 - t)
          if (t < 1) setTimeout(frame, 10)
          else self.spinCompleted()

          window.requestAnimationFrame(() => {
            redraw(self.offscreen, self.angle, prizes)
            render(self.offscreen, canvas)
          })
        }

        setTimeout(frame, 10)
      }
    },
    mounted() {
      this.offscreen = document.createElement('canvas')
      this.resizeIntervalId = setInterval(this.resize, 10)
    },
    beforeDestroy() {
      clearInterval(this.resizeIntervalId)
    }
  }
</script>

<style>
  .wheel-area {
    position: relative;
    flex: 1 1 auto;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
  }
  .wheel {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
  }
</style>
