<template>
  <ModalPanel @close="cancel">
    <span slot="header">Load a Preset</span>

    <table class="load-preset-list">
      <tr v-for="(preset, index) in DEFAULT_PRESETS" class="load-preset-item" :key="index">
        <td width="30">{{ index + 1 }}</td>
        <td width="265">{{ '[Default] ' + preset.name }}</td>
        <td><a href="#" class="button small" @click.prevent.stop="loadPreset(preset)">Load</a></td>
      </tr>
      <tr v-for="(preset, index) in presets" class="load-preset-item" :key="index">
        <td>{{ index + 1 + NUM_DEFAULT_PRESETS }}</td>
        <td>{{ preset.name }}</td>
        <td><a href="#" class="button small" @click.prevent.stop="loadPreset(preset.data)">Load</a></td>
      </tr>
    </table>

    <a href="#" class="button small" @click.prevent.stop="cancel">Cancel</a>
  </ModalPanel>
</template>

<script>
import ModalPanel from './ModalPanel';
import { DEFAULT_PRESETS } from '../data/presets';

export default {
  name: 'LoadPresetPanel',
  components: {
    ModalPanel
  },
  data() {
    return {
      DEFAULT_PRESETS,
      NUM_DEFAULT_PRESETS: DEFAULT_PRESETS.length
    };
  },
  computed: {
    presets() {
      return this.$store.state.presets;
    }
  },
  methods: {
    cancel() {
      this.$emit('close');
    },
    loadPreset(data) {
      this.$store.commit('loadPreset', data);
      this.$emit('close');
    }
  }
};
</script>

<style>
.load-preset-list {
  margin-bottom: 10px;
}
.load-preset-item:nth-child(2n) {
  background-color: #eaecef;
}
</style>
