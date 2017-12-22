<template>
  <div id="app">
    <OptionsPanel v-if="showOptions" />
    <WheelPanel v-else />
  </div>
</template>

<script>
  import OptionsPanel from './components/OptionsPanel'
  import WheelPanel from './components/WheelPanel'

  export default {
    name: 'App',
    components: {
      OptionsPanel,
      WheelPanel
    },
    computed: {
      showOptions() {
        return this.$store.state.showOptions
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Muli');
  html, body {
    font-family: 'Muli', sans-serif;
    font-size: 16px;
    margin: 0;
    height: 100%;
    height: 100vh;
    color: #455A64;
    background-color: #f1f4f9;
  }
  div {
    margin: 0;
    padding: 0;
  }
  .button {
    color: #f1f4f9;
    background-color: #919499;
    text-decoration: none;
    text-transform: uppercase;
    display: inline-block;
    border-radius: 2px;
    padding: 3px 9px;
    min-width: 40px;
    -webkit-transition: background-color .2s, color .2s;
    transition: background-color .2s, color .2s;
  }
  .button:hover, .button:focus {
    color: #fafcff;
    background-color: #a1a4a9;
  }
  .main-panel {
    position: relative;
    min-height: 100%;
    height: 100vh;
  }

  #app {
    text-align: center;
    margin: 0;
    min-height: 100%;
    height: 100vh;
  }
</style>
