<template>
  <div class="main-panel options-panel">
    <div class="hide-options-container">
      <a href="#" class="button" @click.prevent="displayWheel">Back</a>
    </div>

    <div class="options-panel-content" @click="setActiveIndex(-1)">
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
            <table class="options-prizes-list">
              <thead>
                <tr>
                  <td width="40">#</td>
                  <td width="250">Name</td>
                  <td width="40">Freq</td>
                  <td width="40">Hide</td>
                  <td></td>
                </tr>
              </thead>
              <tr v-for="(prize, index) in data.prizes" class="options-prizes-item" @click.stop="setActiveIndex(index)">

                <template v-if="activeIndex === index">
                  <td colspan="5" class="options-prize-editor">
                    <PrizeData :index="index" :prize="prize" />
                  </td>
                </template>

                <template v-else>
                  <td>{{ index + 1 }}</td>
                  <td :style="{
                    backgroundColor: prize.bg || getDefaultBgColor(index),
                    color: prize.text || DEFAULT_TEXT_COLOR
                    }">
                    {{ prize.name }}
                  </td>
                  <td>{{ prize.freq || DEFAULT_FREQUENCY }}</td>
                  <td><input type="checkbox" v-model="prize.hide" /></td>
                  <td><a href="#" class="button small" @click.prevent.stop="removePrize(index)">X</a></td>
                </template>

              </tr>
            </table>
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
  import PrizeData from './PrizeData'
  import { DEFAULT_FREQUENCY, DEFAULT_TEXT_COLOR, createNewPrize, getDefaultBgColor } from '../data'

  export default {
    name: 'OptionsPanel',
    components: {
      PrizeData
    },
    data() {
      return {
        DEFAULT_FREQUENCY,
        DEFAULT_TEXT_COLOR,
        activeIndex: -1
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
        this.activeIndex = this.data.prizes.length - 1
      },
      getDefaultBgColor,
      displayWheel() {
        this.$store.commit('hideOptions')
      },
      loadPreset() {
      },
      removePrize(index) {
        this.$store.commit('removePrize', index)
      },
      save() {
      },
      savePreset() {
      },
      setActiveIndex(index) {
        if (this.activeIndex !== index) {
          this.activeIndex = index
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
  .options-prizes-list {
    margin: 10px 0;
  }
  .options-prizes-list thead {
    font-weight: bold;
  }
  .options-prizes-item {
    cursor: pointer;
  }
  .options-prizes-item:nth-child(2n+1) {
    background-color: #eaecef;
  }
  .options-prizes-item:hover {
    background-color: #e1e4e9;
  }
  .options-prize-editor {
    cursor: default;
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
