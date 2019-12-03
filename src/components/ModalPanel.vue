<template>
  <div class="modal-panel" @click.self="$emit('close')">
    <div class="modal-panel-content">
      <div class="modal-panel-header">
        <slot name="header"></slot>
      </div>

      <slot></slot>
    </div>
  </div>
</template>

<script>
function keyUp(e) {
  const modifiers = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
  if (!modifiers && e.which === 27) {
    // esc
    this.$emit('close');
    e.stopPropagation();
  }
}

export default {
  name: 'ModalPanel',
  data() {
    return {
      onKeyUp: null
    };
  },
  mounted() {
    this.onKeyUp = keyUp.bind(this);
    window.addEventListener('keyup', this.onKeyUp);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyUp);
  }
};
</script>

<style>
.modal-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: left;
  background-color: rgba(241, 244, 249, 0.8);
  z-index: 10;
}
.modal-panel-content {
  padding: 10px 10px 0;
  max-height: 80%;
  min-width: 250px;
  border: 1px solid #c1c4c9;
  border-radius: 3px;
  background-color: #f1f4f9;
  overflow: auto;
  box-sizing: border-box;
}
.modal-panel-content > *:last-child {
  margin-bottom: 10px;
}
.modal-panel-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
