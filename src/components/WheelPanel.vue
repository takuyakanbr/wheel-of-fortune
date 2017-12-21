<template>
  <div id="wheel-panel" class="content-panel">
    <div id="wheel-header">Spin the {{ name }}!</div>
    <Wheel />
    <div id="wheel-footer">Footer</div>
  </div>
</template>

<script>
  import Wheel from './Wheel'
  import { mapState } from 'vuex'

  export default {
    name: 'wheelpanel',
    components: {
      Wheel
    },
    computed: mapState({
      spins: state => state.spins,
      name: state => state.data.name || 'Wheel of Fortune',
      winningText: state => state.data.winningText || 'Result: %s',
      background: state => state.data.background || '',
      removeWinning: state => state.data.removeWinning || false
    })
  }
</script>

<style>
  #wheel-panel {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
  }
  #wheel-header {
    flex: 0 0 auto;
  }
  #wheel-footer {
    flex: 0 0 auto;
  }
</style>
