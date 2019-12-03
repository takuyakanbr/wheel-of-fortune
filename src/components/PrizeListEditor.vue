<template>
  <table class="prizelist">
    <thead>
      <tr>
        <td width="40">#</td>
        <td width="250">Name</td>
        <td width="40">Freq</td>
        <td width="40">Hide</td>
        <td></td>
      </tr>
    </thead>

    <template v-for="(prize, index) in prizes">
      <template v-if="editing === index">
        <tr class="prizelist-item prizelist-item-active" @click.stop="" :key="index">
          <td colspan="5">
            <PrizeEditor :index="index" :prize="prize" />
          </td>
        </tr>
      </template>
      <template v-else>
        <tr class="prizelist-item prizelist-item-inactive" @click.stop="setEditingIndex(index)" :key="index">
          <td>{{ index + 1 }}</td>
          <td
            :style="{
              backgroundColor: prize.bg || getDefaultBgColor(index),
              color: prize.text || DEFAULT_TEXT_COLOR
            }"
          >
            {{ prize.name }}
          </td>
          <td>{{ prize.freq || DEFAULT_FREQUENCY }}</td>
          <td><input type="checkbox" v-model="prize.hide" @click.stop="" /></td>
          <td><a href="#" class="button small" @click.prevent.stop="removePrize(index)">X</a></td>
        </tr>
      </template>
    </template>
  </table>
</template>

<script>
import PrizeEditor from './PrizeEditor';
import { DEFAULT_FREQUENCY, DEFAULT_TEXT_COLOR, getDefaultBgColor } from '../data';

export default {
  name: 'PrizeList',
  components: {
    PrizeEditor
  },
  props: {
    prizes: {
      type: Array,
      required: true
    },
    editing: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      DEFAULT_FREQUENCY,
      DEFAULT_TEXT_COLOR
    };
  },
  methods: {
    getDefaultBgColor,
    removePrize(index) {
      this.$store.commit('removePrize', index);
    },
    setEditingIndex(index) {
      this.$emit('editing', index);
    }
  }
};
</script>

<style>
.prizelist {
  margin: 10px 0;
}
.prizelist > thead {
  font-weight: bold;
}
.prizelist-item:nth-child(2n) {
  background-color: #eaecef;
}
.prizelist-item-active > td {
  border: 1px dashed #b0bec5;
}
.prizelist-item-inactive {
  cursor: pointer;
}
.prizelist-item-inactive:hover {
  background-color: #e1e4e9;
}
</style>
