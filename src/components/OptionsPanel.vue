<template>
  <div class="main-panel options-panel">
    <div class="options-header">Options</div>
    <div class="hide-options-container">
      <a href="#" class="button" @click.prevent="displayWheel">Back</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OptionsPanel',
    methods: {
      displayWheel() {
        this.$store.commit('hideOptions')
      }
    }
  }
</script>

<style>
  .hide-options-container {
    position: fixed;
    top: 10px;
    right: 10px;
  }
</style>
