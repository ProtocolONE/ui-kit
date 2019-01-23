<template>
<button
  :class="buttonClasses"
  v-bind="{ disabled, type }"
  @click="emitClick"
>
  {{ text }}
</button>
</template>

<script>
import { includes } from 'lodash-es';

export default {
  props: {
    disabled: {
      default: false,
      type: Boolean,
    },
    text: {
      default: '',
      type: String,
    },
    color: {
      default: 'blue',
      type: String,
      validator(value) {
        return includes(['blue'], value);
      },
    },
    size: {
      default: 'default',
      type: String,
      validator(value) {
        return includes(['default'], value);
      },
    },
    type: {
      default: 'button',
      type: String,
      validator(value) {
        return includes(['button'], value);
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
$button-color: #2f6ecd;
$button-font-color: #fff;
$hover-button-color: #3787ff;
$disabled-button-color: #e1e1e1;

$primary-button-size: 14px;
$button-font-style: Roboto;

.base-button {
  background-color: $button-color;
  border-radius: 20px;
  border-width: 0;
  color: $button-font-color;
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
    box-shadow: 0 4px 16px rgba($hover-button-color, 0.85);
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

  &:hover {
    background-color: $hover-button-color;

    &:before {
      opacity: 1;
    }
  }

  &:active {
    background-color: $button-color;
    box-shadow: inset 0px 4px 16px rgba(0, 0, 0, 0.15);

    &:before {
      opacity: 0;
    }
  }

  &._disabled {
    background-color: $disabled-button-color;
    pointer-events: none;
  }
}
</style>
