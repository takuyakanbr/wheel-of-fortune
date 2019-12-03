<template>
  <div class="records-panel">
    <div class="records-panel-header">Records</div>
    <div class="records-panel-content" ref="content">
      <table class="records-panel-list">
        <tr v-if="records.length === 0">
          (No records found)
        </tr>
        <template v-else>
          <tr v-for="(record, index) in records" class="records-panel-item" :key="index">
            <td width="30">{{ index + 1 }}</td>
            <td width="190">{{ record }}</td>
          </tr>
        </template>
      </table>
    </div>

    <div class="hide-records-container">
      <a href="#" class="button" @click.prevent.stop="close">Close</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecordsPanel',
  computed: {
    records() {
      return this.$store.state.records;
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  },
  updated() {
    const $e = this.$refs.content;
    $e.scrollTop = $e.scrollHeight;
  }
};
</script>

<style>
.records-panel {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  min-width: 150px;
  background-color: rgba(241, 244, 249, 0.8);
  text-align: left;
  overflow: hidden;
  z-index: 5;
}
.records-panel-header {
  flex: 0 0;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0 10px 10px;
}
.records-panel-content {
  flex: 1 1 auto;
  margin-left: 10px;
  overflow: auto;
}
.records-panel-list > thead {
  font-weight: bold;
}
.records-panel-list td {
  padding: 3px;
}
.records-panel-item:nth-child(2n) {
  background-color: rgba(0, 0, 0, 0.06);
}
.hide-records-container {
  flex: 0 0;
  padding: 12px;
  text-align: right;
  z-index: 6;
}
</style>
