<template>
  <div class="main-panel options-panel" @click="setEditingIndex(-1)">

    <transition name="fade">
      <LoadPresetPanel v-if="panel === 'load'" @close="hidePanel" />
      <SavePresetPanel v-if="panel === 'save'" @close="hidePanel" />
    </transition>

    <div class="options-panel-content">
      <div class="hide-options-container">
        <a href="#" class="button" @click.prevent.stop="goBack">Back</a>
      </div>

      <div class="options-header">Options</div>
      <table class="options-table">
        <tr>
          <td><label for="tb-wheel-name">Name</label></td>
          <td class="options-input-cell"><input type="text" id="tb-wheel-name" v-model="options.name" placeholder="Wheel of Fortune" /></td>
        </tr>
        <tr>
          <td><label for="tb-winning-text">Winning Text</label></td>
          <td class="options-input-cell"><input type="text" id="tb-winning-text" v-model="options.winningText" placeholder="Result: <b>%s</b>" /></td>
        </tr>
        <tr>
          <td><label for="tb-background-image">Background Image</label></td>
          <td class="options-input-cell"><input type="text" id="tb-background-image" v-model="options.background" placeholder="none" /></td>
        </tr>
        <tr>
          <td colspan="2" class="options-checkbox-cell">
            <input type="checkbox" id="cb-remove-winning" v-model="options.removeWinning" />
            <label for="cb-remove-winning">Remove winning items</label>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="options-prizes-header">List of Prizes</div>
            <PrizeListEditor :prizes="options.prizes" :editing="editing" @editing="setEditingIndex" />
            <a href="#" class="button small" @click.prevent.stop="addPrize">Add Prize</a>
          </td>
        </tr>

      </table>
      <div class="options-button-area">
        <a href="#" class="button" @click.prevent="showLoadPresetPanel">Load Preset</a><br />
        <a href="#" class="button" @click.prevent="showSavePresetPanel">Save as Preset</a><br />
        <a href="#" class="button" @click.prevent="saveAndReset">Save and Reset Wheel</a>
      </div>

    </div>

  </div>
</template>

<script>
  import LoadPresetPanel from './LoadPresetPanel'
  import PrizeListEditor from './PrizeListEditor'
  import SavePresetPanel from './SavePresetPanel'
  import { createNewPrize } from '../data'

  export default {
    name: 'OptionsPanel',
    components: {
      LoadPresetPanel,
      PrizeListEditor,
      SavePresetPanel
    },
    data() {
      return {
        editing: -1,
        panel: null
      }
    },
    computed: {
      options() {
        return this.$store.state.options
      }
    },
    methods: {
      addPrize() {
        this.$store.commit('addPrize', createNewPrize())
        this.setEditingIndex(this.options.prizes.length - 1)
      },
      goBack() {
        this.$store.commit('hideOptions')
      },
      hidePanel() {
        this.panel = null
      },
      saveAndReset() {
        this.$store.commit('saveAndReset')
        this.$store.commit('hideOptions')
      },
      setEditingIndex(index) {
        if (this.editing !== index) {
          this.editing = index
        }
      },
      showLoadPresetPanel() {
        this.panel = 'load'
      },
      showSavePresetPanel() {
        this.panel = 'save'
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
    position: relative;
    flex: 1 1;
    max-width: 520px;
    text-align: left;
    padding: 5px;
    overflow: auto;
  }
  .options-header {
    font-size: 20px;
    font-weight: bold;
    padding: 15px 5px 20px;
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
    margin: 20px 5px 25px;
    float: right;
    clear: both;
  }
  .options-button-area a {
    margin-top: 6px;
  }
  .hide-options-container {
    position: fixed;
    top: 12px;
    right: 12px;
    z-index: 10;
  }
  @media(max-width: 720px) {
    .hide-options-container {
      position: absolute;
      top: 20px;
    }
  }
</style>
