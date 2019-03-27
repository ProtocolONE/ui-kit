<template>
<transition name="modal">
  <div
    class="overlay"
    @click.self="$emit('close')"
  >
    <div class="content">
      <div class="header">
        <slot name="header" />
      </div>
      <div class="main">
        <slot name="main" />
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>

      <div
        v-if="hasCloseButton"
        class="close-button"
        @click="$emit('close')"
      >
        <svg viewBox="0 0 16 16" class="close-icon">
          <path d="M0,0 L16,16" />
          <path d="M16,0 L0,16" />
        </svg>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  props: {
    hasCloseButton: {
      default: false,
      type: Boolean,
    },
  },
}
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  z-index: 9000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  transition: opacity 0.2s ease-out;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  position: relative;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 32px;
}
.header {
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.header,
.main,
.footer {
  &:empty {
    display: none;
  }
}
.footer {
  align-items: center;
  justify-content: center;
  margin-top: 16px;
}
.close-button {
  position: absolute;
  display: block;
  right: 0;
  top: 0;
  padding: 16px;
  width: 16px;
  height: 16px;
  box-sizing: content-box;
  cursor: pointer;

  &:hover {
    .close-icon {
      stroke: #999;
    }
  }
}
.close-icon {
  width: 16px;
  height: 16px;
  display: block;
  stroke-width: 2px;
  stroke: #c4c4c4;
  transition: stroke 0.2s ease-out;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .box,
.modal-leave-active .box {
  transform: scale(1.1);
}
</style>
