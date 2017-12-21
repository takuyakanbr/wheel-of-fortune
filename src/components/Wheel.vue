<template>
  <div id="wheel-area" ref="container">
    <canvas id="wheel" ref="canvas"></canvas>
  </div>
</template>

<script>
  import { getTotalFrequency } from '../data'

  function repaint(canvas, angle, prizes) {
    const r = Math.min(canvas.width, canvas.height) / 2.25
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const ctx = canvas.getContext('2d')

    let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, 'rgba(0,0,0,0)')
    g.addColorStop(1, 'rgba(0,0,0,0.1)')

    const totalFreqs = getTotalFrequency(prizes)
    let freqs = 0
    prizes.forEach(prize => {
      const a0 = angle + 2 * Math.PI * freqs / totalFreqs
      const a1 = angle + 2 * Math.PI * (freqs + prize.freq) / totalFreqs
      const a = angle + 2 * Math.PI * (freqs + prize.freq / 2) / totalFreqs
      freqs += prize.freq

      // prize background
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, r, a0, a1, false)
      ctx.fillStyle = prize.bg
      ctx.fill()
      ctx.fillStyle = g
      ctx.fill()
      ctx.save()

      // prize text
      ctx.fillStyle = prize.text
      ctx.font = 'bold 16px sans-serif'
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      ctx.translate(cx, cy)
      ctx.rotate(a)
      ctx.fillText(prize.name, r * 0.88, 0)
      ctx.restore()
    })

    // outer ring
    ctx.shadowOffsetX = r / 80
    ctx.shadowOffsetY = r / 80
    ctx.shadowBlur = r / 40
    ctx.shadowColor = 'rgba(0,0,0,0.5)'
    ctx.beginPath()
    ctx.arc(cx, cy, r * 1.005, 0, 2 * Math.PI, true)
    ctx.arc(cx, cy, r * 0.985, 0, 2 * Math.PI, false)
    ctx.fillStyle = '#444'
    ctx.fill()

    // center ring
    ctx.shadowOffsetX = r / 40
    ctx.shadowOffsetY = r / 40
    ctx.fillStyle = '#333'
    ctx.beginPath()
    ctx.arc(cx, cy, 15, 0, 2 * Math.PI, false)
    ctx.fill()

    // prize pointer
    ctx.translate(cx, cy)
    ctx.rotate(Math.PI / 2)
    ctx.beginPath()
    ctx.moveTo(-r * 1.010, -r * 0.05)
    ctx.lineTo(-r * 0.935, 0)
    ctx.lineTo(-r * 1.010, r * 0.05)
    ctx.fillStyle = 'red'
    ctx.fill()
  }

  export default {
    name: 'wheel',
    data() {
      return {
        intervalId: null,
        angle: 0
      }
    },
    computed: {
      available() {
        return this.$store.state.available
      }
    },
    methods: {
      resize() {
        const canvas = this.$refs.canvas
        if (canvas.height !== canvas.offsetHeight || canvas.width !== canvas.offsetWidth) {
          canvas.width = canvas.offsetWidth
          canvas.height = canvas.offsetHeight
          repaint(canvas, this.angle, this.available)
        }
      }
    },
    mounted() {
      this.intervalId = setInterval(this.resize, 10)
    },
    beforeDestroy() {
      clearInterval(this.intervalId)
    }
  }
</script>

<style>
  #wheel-area {
    position: relative;
    flex: 1 1 auto;
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
  }
  #wheel {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    max-height: 100%;
    max-width: 100%;
    overflow: hidden;
  }
</style>
