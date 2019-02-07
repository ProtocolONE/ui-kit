<template>
<div
  v-clickaway="blur"
  :class="inputClasses"
  @click="focused ? blur() : focus()"
>
  <span
    v-if="label"
    class="label"
    :title="label"
  >
    {{ label }}
  </span>
  <span
    v-if="additionalInfo"
    class="additional"
    :title="additionalInfo"
  >
    {{ additionalInfo }}
  </span>
  <span class="selected">
    {{ dropdownValue }}
  </span>
  <div class="box">
    <div class="options">
      <label
        v-for="(option, index) in options"
        :key="index"
        :class="['option', option === dropdownValue ? '_current' : '']"
      >
        {{ option }}
        <input
          v-model="dropdownValue"
          class="input"
          name="dropdownValue"
          type="radio"
          :required="required"
          :value="option"
          @input="emitChange"
        >
      </label>
    </div>
    <div class="overlay" />
  </div>
</div>
</template>

<script>
import { directive as clickaway } from 'vue-clickaway';

export default {
  directives: {
    clickaway,
  },
  props: {
    additionalInfo: {
      default: '',
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    label: {
      default: '',
      type: String,
    },
    options: {
      default: () => [],
      type: Array,
    },
    required: {
      default: false,
      type: Boolean,
    },
    value: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      dropdownValue: this.value,
      focused: false,
    };
  },
  computed: {
    /**
     * Classes for dropdown
     * @return {Array<string>}
     */
    inputClasses() {
      return [
        'dropdown-field',
        this.focused ? '_focused' : '',
        !this.dropdownValue ? '_empty' : '',
        this.disabled ? '_disabled' : '',
      ];
    },
  },
  watch: {
    value(val) {
      this.dropdownValue = val;
    },
  },
  methods: {
    emitChange({ target: { value } }) {
      this.blur();
      this.$emit('input', value);
    },
    focus() {
      this.focused = true;
    },
    blur() {
      this.focused = false;
    },
  },
};
</script>

<style scoped lang="scss">
/** @TODO - move to gui for typographics */
$input-background-color: #fff;
$primary-input-color: #333;
$secondary-input-color: #b1b1b1;
$focus-input-color: #3787ff;
$hover-option-color: #deebfa;

$primary-input-size: 16px;
$secondary-input-size: 14px;

$input-font-style: Lato;

.dropdown-field {
  background-color: $input-background-color;
  border-style: solid;
  border-width: 0;
  border-bottom-width: 1px;
  border-color: #e5e5e5;
  box-sizing: border-box;
  color: $primary-input-color;
  cursor: pointer;
  display: inline-block;
  font-size: $primary-input-size;
  font-style: $input-font-style;
  height: 56px;
  padding: 24px 0 0;
  position: relative;
  transition: border-color 0.2s ease-out;
  width: 100%;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 40px;
    border: 4px solid transparent;
    border-top: 4px solid $secondary-input-color;
  }

  &:not(._empty) {
    & > .label {
      pointer-events: auto;
      width: 50%;
      transform: translateY(-24px) scale(0.875, 0.875);
    }

    & > .selected {
      transform: scaleY(1);
    }

    &._focused {
      &:after {
        border-top-color: $focus-input-color;
      }

      & > .label {
        pointer-events: none;
        width: 100%;
        transform: translateY(0) scale(1, 1);
      }

      & > .selected {
        transform: scaleY(0);
      }
    }
  }

  &._focused {
    border-color: $input-background-color;

    &:after {
      border-top-color: $focus-input-color;
    }

    & > .label {
      color: $focus-input-color;
    }

    & > .box {
      transform: scaleY(1);
    }
  }

  &._disabled {
    &:not(._empty) {
      border-bottom-color: transparent;
    }
    border-bottom-color: transparent;
    color: $secondary-input-color;
    pointer-events: none;
  }
}
.selected {
  display: block;
  width: 100px;
  height: 32px;
  line-height: 32px;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.2s ease-out;
}
.box {
  background-color: $input-background-color;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  left: -16px;
  position: absolute;
  text-overflow: ellipsis;
  top: 56px;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.2s ease-out;
  white-space: nowrap;
  width: calc(100% + 32px);
}
.options {
  background-color: $input-background-color;
  max-height: 220px;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
.overlay {
  background-image: linear-gradient(0deg, $input-background-color 0%, rgba($input-background-color, 0) 100%);
  bottom: 0;
  pointer-events: none;
  height: 40px;
  left: 0;
  min-height: 40px;
  position: absolute;
  right: 0;
}
.option {
  cursor: pointer;
  display: block;
  height: 40px;
  line-height: 40px;
  padding: 0 16px;
  margin: 0;

  &:hover,
  &._current {
    background-color: $hover-option-color;
  }
}
input {
  height: 0;
  visibility: hidden;
  width: 0;
}
.additional,
.label {
  color: $secondary-input-color;
  line-height: 32px;
  margin: 0;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.label {
  font-size: $primary-input-size;
  left: 0;
  pointer-events: none;
  top: 24px;
  transform-origin: left;
  transition: transform 0.2s ease-out, color 0.2s linear, width 0.1s ease-out;
  width: 100%;
}
.additional {
  font-size: $secondary-input-size;
  max-width: 50%;
  right: 0;
  top: 0;
}
</style>
