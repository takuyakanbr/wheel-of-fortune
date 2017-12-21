<template>
  <div id="app">
    <SettingsPanel v-if="showSettings" />
    <WheelPanel v-else />
  </div>
</template>

<script>
  import SettingsPanel from './components/SettingsPanel'
  import WheelPanel from './components/WheelPanel'

  export default {
    name: 'app',
    components: {
      SettingsPanel,
      WheelPanel
    },
    computed: {
      showSettings() {
        return this.$store.state.showSettings
      }
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    margin: 0;
    height: 100vh;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    min-height: 100%;
    height: 100vh;
  }
  .content-panel {
    min-height: 100%;
    height: 100vh;
  }
</style>
