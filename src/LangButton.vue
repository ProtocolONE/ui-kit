<template>
<button :class="buttonClasses">
  {{ text.toUpperCase() }}
</button>
</template>

<script>
export default {
  props: {
    filled: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      require: true,
    },
  },
  computed: {
    buttonClasses() {
      return ['lang-button', this.selected ? '_selected' : '', this.filled ? '_filled' : ''];
    },
  },
};
</script>

<style scoped lang="scss">
.lang-button {
  position: relative;
  background-color: #fff;
  border: 1px solid #b1b1b1;
  border-radius: 2px;
  font-size: 14px;
  padding: 0 24px 0 8px;
  cursor: pointer;
  outline: none;
  height: 24px;
  line-height: 24px;

  &:after {
    content: '';
    border-radius: 50%;
    background-color: #b1b1b1;
    width: 6px;
    height: 6px;
    top: 8px;
    right: 8px;
    position: absolute;
  }

  &:hover {
    color: #2f6ecc;
  }

  &._filled {
    &:after {
      background-color: #54d779;
    }
  }
  &._selected {
    border-color: #2f6ecc;
  }
}
</style>
