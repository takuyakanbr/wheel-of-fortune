<template>
  <ModalPanel @close="cancel">
    <span slot="header">Save as Preset</span>

    <table class="save-preset-list">
      <tr v-if="presets.length === 0">
        <td>(No presets found)</td>
      </tr>
      <template v-else>
        <tr v-for="(preset, index) in presets" class="save-preset-item" :key="index">
          <td width="30">{{ index + 1 }}</td>
          <td width="265">{{ preset.name }}</td>
          <td width="50"><a href="#" class="button small" @click.prevent.stop="savePreset(index)">Save</a></td>
          <td><a href="#" class="button small" @click.prevent.stop="removePreset(index)">X</a></td>
        </tr>
      </template>
    </table>

    <div class="save-preset-new">
      <template v-if="showTextbox">
        <input type="text" v-model="newPresetName" placeholder="Preset name" />
        <a href="#" class="button small" @click.prevent.stop="saveNewPreset">Save</a>
      </template>
      <a v-else href="#" class="button small" @click.prevent.stop="editName">New Preset</a>
    </div>

    <a href="#" class="button small" @click.prevent.stop="cancel">Cancel</a>
  </ModalPanel>
</template>

<script>
import ModalPanel from './ModalPanel';

export default {
  name: 'SavePresetPanel',
  components: {
    ModalPanel
  },
  data() {
    return {
      newPresetName: '',
      showTextbox: false
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
    editName() {
      this.showTextbox = true;
    },
    removePreset(index) {
      this.$store.commit('removePreset', index);
    },
    saveNewPreset() {
      this.$store.commit('saveNewPreset', this.newPresetName);
      this.$emit('close');
    },
    savePreset(index) {
      this.$store.commit('savePreset', index);
      this.$emit('close');
    }
  }
};
</script>

<style>
.save-preset-list {
  margin-bottom: 10px;
}
.save-preset-item:nth-child(2n) {
  background-color: #eaecef;
}
.save-preset-new {
  margin-bottom: 8px;
}
</style>
