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
    visible: {
      default: false,
      type: Boolean,
    },
    withoutPadding: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    tipClasses() {
      return [
        'simple-tip',
        `_${this.color}`,
        this.visible ? '_show' : '',
        this.withoutPadding ? '_without-padding' : '',
      ];
    },
  },
};
</script>

<style scoped lang="scss">
@mixin simple-tip($background: #fff) {
  right: 0;
  top: 50%;
  transform: translate(calc(100% + 16px), -50%);
  position: absolute;
  border-radius: 2px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
  padding: 32px;
  background-color: $background;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease-out;

  &:before {
    position: absolute;
    content: '\25C0';
    left: -10px;
    top: calc(50% - 8px);
    text-shadow: -4px 0px 4px rgba(0, 0, 0, 0.05);
    z-index: -1;
    transform: scaleY(1.6);
    font-size: 12px;
    color: $background;
  }

  &._without-padding {
    padding: 0;
  }
}

.simple-tip {
  @include simple-tip();

  &._white {
    @include simple-tip($background: #fff);
  }
  &._show {
    opacity: 1;
    pointer-events: initial;
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
