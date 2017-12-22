<template>
  <div class="content-panel wheel-panel">
    <div class="wheel-header">
      <div class="wheel-header-text" :style="{ width: headerWidth + 'px' }">{{ name }}</div>
    </div>
    <Wheel ref="wheel" @resize="updateHeaderWidth" @spinCompleted="spinCompleted" />
    <div class="wheel-footer">
      <div class="wheel-result" v-html="resultText"></div>
      <a href="#" class="button" @click.prevent="startSpin">{{ spinText }}</a>
    </div>
    <div class="options-container">
      <a href="#" class="button" @click.prevent="displayOptions">Options</a>
    </div>
  </div>
</template>

<script>
  import Wheel from './Wheel'
  import { mapState } from 'vuex'

  export default {
    name: 'WheelPanel',
    components: {
      Wheel
    },
    data() {
      return {
        headerWidth: 300,
        spinning: false,
        spinText: 'Spin!',
        resultText: 'Ready. Get set.'
      }
    },
    computed: mapState({
      spins: state => state.spins,
      name: state => state.data.name || 'Wheel of Fortune',
      winningText: state => state.data.winningText || 'Result: %s',
      background: state => state.data.background || '',
      removeWinning: state => state.data.removeWinning || false
    }),
    methods: {
      displayOptions() {
        if (!this.spinning) {
          this.$store.commit('showOptions')
        }
      },
      spinCompleted() {
        this.spinning = false
        this.spinText = 'Spin again!'
        this.resultText = 'Spin completed.'
      },
      startSpin() {
        if (!this.spinning) {
          this.spinning = true
          this.spinText = 'Spinning...'
          this.resultText = '&#8203;'
          this.$refs.wheel.startSpin()
        }
      },
      updateHeaderWidth(width) {
        this.headerWidth = width
      }
    }
  }
</script>

<style>
  .wheel-panel {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
  }
  .wheel-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 auto;
    padding: 12px 0;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
  }
  .wheel-header-text {
    min-width: 300px;
  }
  .wheel-footer {
    flex: 0 0 auto;
    padding: 12px 0;
    font-size: 18px;
  }
  .wheel-result {
    margin-bottom: 6px;
  }
  .options-container {
    position: fixed;
    top: 10px;
    right: 10px;
  }
</style>
