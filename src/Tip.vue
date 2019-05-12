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
    position: {
      default: 'right',
      type: String,
      validator(value) {
        return includes(['left', 'right'], value);
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
        `_${this.position}`,
        this.visible ? '_show' : '',
        this.withoutPadding ? '_without-padding' : '',
      ];
    },
  },
};
</script>

<style scoped lang="scss">
$colors: white;
$positions: left, right;

@mixin simple-tip($background: white, $position: right) {
  top: 50%;
  position: absolute;
  border-radius: 2px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
  padding: 32px;
  background-color: $background;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease-out;

  @if $position == right {
    right: 0;
    left: auto;
    transform: translate(calc(100% + 16px), -50%);
  } @else if $position == left {
    left: 0;
    right: auto;
    transform: translate(calc(-100% - 16px), -50%);
  }

  &:before {
    position: absolute;
    content: '\25C0';
    top: calc(50% - 8px);
    text-shadow: -4px 0px 4px rgba(0, 0, 0, 0.05);
    z-index: -1;
    font-size: 12px;
    color: $background;

    @if $position == right {
      left: -10px;
      transform: scaleY(1.6);
    } @else if $position == left {
      right: -10px;
      transform: scaleY(1.6) rotate(180deg);
    }
  }

  &._without-padding {
    padding: 0;
  }

  &._show {
    opacity: 1;
    pointer-events: initial;
  }
}
.simple-tip {
  @include simple-tip();

  @each $color in $colors {
    @each $position in $positions {
      &._#{$color}._#{$position} {
        @include simple-tip($background: $color, $position: $position);
      }
    }
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
