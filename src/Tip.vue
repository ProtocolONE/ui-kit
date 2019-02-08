<template>
<div :class="tipClasses">
  <header class="header">
    <slot name="header"></slot>
  </header>
  <main class="main">
    <slot></slot>
  </main>
  <footer class="footer">
    <slot name="footer"></slot>
  </footer>
</div>
</template>

<script>
import { includes } from 'lodash-es';

export default {
  props: {
    color: {
      default: 'white',
      type: String,
      validator(value) {
        return includes(['white'], value);
      },
    },
  },
  computed: {
    tipClasses() {
      return [
        'simple-tip',
        `_${this.color}`,
      ];
    },
  },
};
</script>

<style scoped lang="scss">
@mixin simple-tip($background: #fff, $padding: 32px) {
  position: relative;
  border-radius: 2px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  padding: $padding;
  background-color: $background;

  &:before,
  &:after {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    left: -6px;
    top: 40px;
    border: 6px solid $background;
    border-color: transparent transparent $background $background;
    transform-origin: center;
    transform: rotate(45deg);
  }

  &:before {
    box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.1);
    z-index: -1;
  }
}

.simple-tip {
  &._white {
    @include simple-tip();
  }
}

.header,
.main,
.footer {
  &:empty {
    display: none;
  }
}
</style>
