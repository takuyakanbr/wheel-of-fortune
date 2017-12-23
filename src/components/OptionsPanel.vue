<template>
  <div class="main-panel options-panel">
    <div class="hide-options-container">
      <a href="#" class="button" @click.prevent="displayWheel">Back</a>
    </div>

    <div class="options-panel-content" @click="setEditingIndex(-1)">
      <div class="options-header">Options</div>
      <table class="options-table">
        <tr>
          <td><label for="tb-wheel-name">Name</label></td>
          <td class="options-input-cell"><input type="text" id="tb-wheel-name" v-model="data.name" placeholder="Wheel of Fortune" /></td>
        </tr>
        <tr>
          <td><label for="tb-winning-text">Winning Text</label></td>
          <td class="options-input-cell"><input type="text" id="tb-winning-text" v-model="data.winningText" placeholder="Result: <b>%s</b>" /></td>
        </tr>
        <tr>
          <td><label for="tb-background-image">Background Image</label></td>
          <td class="options-input-cell"><input type="text" id="tb-background-image" v-model="data.background" placeholder="none" /></td>
        </tr>
        <tr>
          <td colspan="2" class="options-checkbox-cell"><input type="checkbox" id="cb-remove-winning" v-model="data.removeWinning" />
          <label for="cb-remove-winning">Remove winning items</label></td>
        </tr>

        <tr>
          <td colspan="2">
            <div class="options-prizes-header">List of Prizes</div>
            <PrizeListEditor :prizes="data.prizes" :editing="editing" @editing="setEditingIndex"/>
            <a href="#" class="button small" @click.prevent.stop="addPrize">Add Prize</a>
          </td>
        </tr>

      </table>

      <div class="options-button-area">
        <a href="#" class="button" @click.prevent="loadPreset">Load Preset</a><br/>
        <a href="#" class="button" @click.prevent="savePreset">Save as Preset</a><br/>
        <a href="#" class="button" @click.prevent="save">Save and Go Back</a>
      </div>

    </div>

  </div>
</template>

<script>
  import PrizeListEditor from './PrizeListEditor'
  import { createNewPrize } from '../data'

  export default {
    name: 'OptionsPanel',
    components: {
      PrizeListEditor
    },
    data() {
      return {
        editing: -1
      }
    },
    computed: {
      data() {
        return this.$store.state.data
      }
    },
    methods: {
      addPrize() {
        this.$store.commit('addPrize', createNewPrize())
        this.setEditingIndex(this.data.prizes.length - 1)
      },
      displayWheel() {
        this.$store.commit('hideOptions')
      },
      loadPreset() {
      },
      save() {
      },
      savePreset() {
      },
      setEditingIndex(index) {
        if (this.editing !== index) {
          this.editing = index
        }
      }
    }
  }
</script>

<style>
  .options-panel {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .options-panel-content {
    flex: 1 1;
    max-width: 520px;
    text-align: left;
    padding: 5px;
    overflow: auto;
  }
  .options-header {
    font-size: 20px;
    font-weight: bold;
    padding: 15px 0 20px;
  }

  .options-table td {
    padding: 4px;
    vertical-align: middle;
    white-space: nowrap;
  }
  .options-table input[type=text] {
    width: 100%;
  }
  .options-input-cell {
    width: 400px;
  }
  td.options-checkbox-cell {
    padding-top: 10px;
  }
  .options-prizes-header {
    font-size: 18px;
    font-weight: bold;
    margin-top: 12px;
  }

  .options-button-area {
    margin: 20px 0 25px;
    float: right;
    clear: both;
  }
  .options-button-area a {
    margin-top: 6px;
  }
  .hide-options-container {
    position: fixed;
    top: 10px;
    right: 10px;
  }
</style>
