<template>
<button
  :class="buttonClasses"
  v-bind="{ disabled, type }"
  @click="emitClick"
>
  {{ text }}
  <slot />
</button>
</template>

<script>
import { includes } from 'lodash-es';

export default {
  props: {
    color: {
      default: 'blue',
      type: String,
      validator(value) {
        return includes(['blue', 'orange', 'purple', 'green', 'gray'], value);
      },
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    isTransparent: {
      default: false,
      type: Boolean,
    },
    size: {
      default: 'default',
      type: String,
      validator(value) {
        return includes(['default'], value);
      },
    },
    text: {
      default: '',
      type: String,
    },
    type: {
      default: 'button',
      type: String,
      validator(value) {
        return includes(['button', 'submit', 'reset', 'rectangle'], value);
      },
    },
  },
  computed: {
    /**
     * Classes for button
     * @return {Array<string>}
     */
    buttonClasses() {
      return [
        /**
         * We need unique classes for root elements in our components
         * because root elements debends on parent's style scope
         */
        'base-button',
        this.disabled ? '_disabled' : '',
        this.isTransparent ? '_transparent' : '',
        ...[this.color, this.size, this.type].map(value => `_${value}`),
      ];
    },
  },
  methods: {
    /**
     * @param {Event} event
     */
    emitClick(event) {
      // If button has disabled we shoudn't send events
      if (this.disabled) {
        return;
      }

      this.$emit('click', event);
    },
  },
};
</script>

<style scoped lang="scss">
/** @TODO - move to gui consts, fix color and typographics consts */
$blue-button-color: #2f6ecd;
$orange-button-color: #ff6f6f;
$purple-button-color: #8077e7;
$green-button-color: #009d19;
$button-font-color: #fff;
$disabled-button-color: #e1e1e1;

$primary-button-size: 14px;
$button-font-style: Loto;

@mixin base-button($background, $color: $button-font-color) {
  background-color: $background;
  border-radius: 20px;
  border-width: 0;
  color: $color;
  cursor: pointer;
  display: inline-block;
  font-size: $primary-button-size;
  font-style: $button-font-style;
  height: 40px;
  line-height: 40px;
  max-width: 100%;
  outline: none;
  padding: 0 24px;
  position: relative;
  text-align: center;
  transition: background-color 0.2s ease-out, box-shadow 0.2s ease-out;

  &:before {
    bottom: 1px;
    content: '';
    left: 1px;
    position: absolute;
    right: 1px;
    top: 3px;
    transition: opacity 0.3s;
    pointer-events: none;
    border-radius: 20px;
    opacity: 0;
  }

  &:before {
    box-shadow: 0 4px 16px rgba($background, 0.85);
  }

  &:hover {
    background-color: rgba($background, 0.85);

    &:before {
      opacity: 1;
    }
  }

  &:active {
    background-color: $background;
    box-shadow: inset 0px 4px 16px rgba(0, 0, 0, 0.15);

    &:before {
      opacity: 0;
    }
  }

  &._disabled {
    background-color: $disabled-button-color;
    pointer-events: none;
  }

  &._rectangle {
    border-radius: 4px;
  }

  &._transparent {
    background-color: transparent;
    color: $background;
    box-shadow: inset 0px 0px 0px 2px rgba($background, 0.6);
  }
}

.base-button {
  &._blue {
    @include base-button($blue-button-color);
  }
  &._orange {
    @include base-button($orange-button-color);
  }
  &._purple {
    @include base-button($purple-button-color);
  }
  &._green {
    @include base-button($green-button-color);
  }
  &._gray {
    @include base-button($disabled-button-color);
  }
}
</style>
