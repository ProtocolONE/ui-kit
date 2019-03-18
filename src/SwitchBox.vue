<template>
<div class="switch-box">
  <input
    v-bind="{ checked, disabled, id }"
    class="input"
    type="checkbox"
    @change="emitChange"
  >
  <label
    :for="id"
    :class="switchClasses"
  >
    <div class="dot" />
  </label>
</div>
</template>

<script>
import { includes, uniqueId } from 'lodash-es';

export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      default: false,
      type: Boolean,
    },
    disabled: {
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
  },
  computed: {
    /**
     * Classes for switch
     * @return {Array<string>}
     */
    switchClasses() {
      return ['label', `_${this.size}`, this.disabled ? '_disabled' : ''];
    },
    /**
     * Unique ID for switch element
     * @return {string}
     */
    id() {
      return uniqueId('switch');
    },
  },
  methods: {
    /**
     * @param {Event} event
     */
    emitChange(event) {
      // If button has disabled we shoudn't send events
      if (this.disabled) {
        return;
      }

      this.$emit('change', event.target.checked);
    },
  },
};
</script>

<style scoped lang="scss">
/** @TODO - move to gui consts, fix color and typographics consts */
$switch-color: #cfcfcf;
$switch-dot-color: #fff;
$disabled-switch-color: #e1e1e1;
$checked-switch-color: #55d287;

.switch-box {
  display: inline-block;
  position: relative;
}
.input {
  height: 0;
  position: absolute;
  visibility: hidden;
  width: 0;

  &:checked + .label {
    background-color: $checked-switch-color;
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.15);
  }
  &:checked + .label > .dot {
    left: 24px;
  }
}
.label {
  border-radius: 12px;
  cursor: pointer;
  display: block;
  transition: all 0.2s ease-out;
  background-color: $switch-color;
  height: 24px;
  width: 44px;
  margin-bottom: 0;

  &._disabled {
    background-color: $disabled-switch-color;
    border-color: $disabled-switch-color;

    & > .dot {
      box-shadow: none;
    }
  }
}
.dot {
  background-color: $switch-dot-color;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  height: 16px;
  left: 4px;
  position: absolute;
  top: 4px;
  transition: left 0.2s ease-out;
  width: 16px;
}
</style>
