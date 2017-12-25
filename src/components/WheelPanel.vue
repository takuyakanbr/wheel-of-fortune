<template>
  <div class="main-panel wheel-panel">

    <div class="show-options-container">
      <a href="#" class="button" @click.prevent.stop="displayOptions">Options</a>
    </div>

    <div class="show-records-container">
      <a href="#" class="button" @click.prevent.stop="displayRecords">Records</a>
    </div>

    <transition name="fade">
      <RecordsPanel v-if="showRecords" @close="hideRecords" />
    </transition>

    <div class="wheel-panel-content">

      <div class="wheel-header-area">
        <div class="wheel-header" :style="{ width: headerWidth + 'px' }">
          <div class="wheel-header-title">{{ name }}</div>
        </div>
      </div>

      <Wheel ref="wheel" @result="spinCompleted" />

      <div class="wheel-footer-area">
        <div class="wheel-footer">
          <div class="wheel-result" v-html="resultText"></div>
          <a href="#" class="button" @click.prevent="startSpin">{{ spinText }}</a>
        </div>
      </div>

    </div>

    <img class="background-image" :src="background ? background : null" />

  </div>
</template>

<script>
  import RecordsPanel from './RecordsPanel'
  import Wheel from './Wheel'
  import { mapState } from 'vuex'

  export default {
    name: 'WheelPanel',
    components: {
      RecordsPanel,
      Wheel
    },
    data() {
      return {
        showRecords: false,
        spinning: false,
        spinText: 'Spin!',
        resultText: 'Ready. Get set.'
      }
    },
    computed: mapState({
      spins: state => state.spins,
      name: state => state.data.name || 'Wheel of Fortune',
      winningText: state => state.data.winningText || 'Result: <b>%s</b>',
      background: state => state.data.background || '',
      prizes: state => state.available,
      headerWidth: state => state.size
    }),
    methods: {
      displayRecords() {
        this.showRecords = true
      },

      // Called by the Options button. Shows the options panel.
      displayOptions() {
        if (!this.spinning) {
          this.$store.commit('showOptions')
        }
      },

      hideRecords() {
        this.showRecords = false
      },

      // Called when the Wheel has stopped spinning.
      spinCompleted(index) {
        const prize = this.prizes[index]
        this.spinning = false
        this.spinText = 'Spin again!'
        this.resultText = this.winningText.replace('%s', prize.name)
      },

      // Called by the Spin button. Requests the Wheel to start spinning.
      startSpin() {
        if (!this.spinning) {
          this.$store.commit('updateAvailable')
          if (this.prizes.length === 0) return

          this.spinning = true
          this.spinText = 'Spinning...'
          this.resultText = '&#8203;'
          this.$refs.wheel.startSpin()
        }
      }
    }
  }
</script>

<style>
  .wheel-panel-content {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    min-height: 100%;
    height: 100vh;
    z-index: 2;
  }
  .wheel-header-area {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 0 0 auto;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    background-color: rgba(241, 244, 249, 0.3);
  }
  .wheel-header {
    margin: 12px;
    min-width: 300px;
  }
  .wheel-header-title {
    display: inline-block;
    border-radius: 3px;
  }
  .wheel-footer-area {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 0 0 auto;
    background-color: rgba(241, 244, 249, 0.3);
  }
  .wheel-footer {
    padding: 12px;
    font-size: 18px;
    border-radius: 3px;
  }
  .wheel-result {
    margin-bottom: 6px;
  }
  .background-image {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4;
  }
  .show-options-container {
    position: fixed;
    top: 12px;
    right: 12px;
    z-index: 3;
  }
  .show-records-container {
    position: fixed;
    bottom: 12px;
    right: 12px;
    z-index: 3;
  }
</style>
