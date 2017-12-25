<template>
  <div id="app">
    <transition name="fade-in" mode="out-in" appear>
      <OptionsPanel v-if="showOptions" />
      <WheelPanel v-else />
    </transition>
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
    font-size: 15px;
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
  input[type=text], input[type=number] {
    font-family: 'Muli', sans-serif;
    font-size: 15px;
    padding: 5px;
    background: none;
    color: #37474F;
    border: none;
    border-bottom: 1px solid #B0BEC5;
    transform-origin: left;
    transition: border-color .25s;
  }
  input[type=text]:focus, input[type=number]:focus {
    outline: none;
    border-bottom-color: #546E7A;
  }
  .button {
    color: #f1f4f9;
    background-color: #919499;
    text-decoration: none;
    text-transform: uppercase;
    text-align: center;
    display: inline-block;
    border-radius: 2px;
    padding: 3px 9px;
    min-width: 40px;
    transition: background-color .2s, color .2s;
  }
  .button:hover, .button:focus {
    color: #fafcff;
    background-color: #a1a4a9;
  }
  .button.small {
    text-transform: none;
    padding: 2px 5px;
    min-width: 20px;
  }
  .main-panel {
    position: relative;
    min-height: 100%;
    height: 100vh;
  }
  .fade-enter-active, .fade-leave-active, .fade-in-enter-active {
    transition: opacity .15s;
  }
  .fade-in-enter-active {
    transition: opacity .25s;
  }
  .fade-enter, .fade-leave-to, .fade-in-enter {
    opacity: 0;
  }

  #app {
    text-align: center;
    margin: 0;
    min-height: 100%;
    height: 100vh;
  }
</style>
