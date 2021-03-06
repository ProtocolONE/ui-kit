<template>
<div
  v-clickaway="blur"
  :class="selectClasses"
  @click="focused ? blur() : focus()"
>
  <span
    v-if="label"
    :class="['label', { '_required': required }]"
    :title="label"
  >
    {{ label }}
  </span>
  <span
    v-if="isVisibleError"
    class="error"
    :title="errorText"
  >
    {{ errorText }}
  </span>
  <span
    v-if="additionalInfo"
    class="additional"
    :title="additionalInfo"
  >
    {{ additionalInfo }}
  </span>
  <span class="selected">
    {{ selectedLabel }}
  </span>
  <div class="box">
    <div class="options">
      <label
        v-for="option in optionsView"
        :key="option.value"
        class="option"
        :class="{
          '_empty': option.value === '',
          '_current': selectValue === option.value
        }"
      >
        {{ option.label }}
        <input
          v-model="selectValue"
          class="input"
          name="selectValue"
          type="radio"
          :required="required"
          :value="option.value"
          @input="emitChange"
        >
      </label>
    </div>
    <div
      v-if="optionsView.length > 5"
      class="overlay"
    />
  </div>
</div>
</template>

<script>
import { directive as clickaway } from 'vue-clickaway';
import { find } from 'lodash-es';

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
      validator(value) {
        if (!value.length) {
          return true;
        }
        if (value[0].label !== undefined && value[0].value !== undefined) {
          return true;
        }
        return false;
      },
    },
    required: {
      default: false,
      type: Boolean,
    },
    value: {
      default: '',
      type: [String, Number],
    },
    hasEmptyValue: {
      default: false,
      type: Boolean,
    },
    placeholder: {
      default: 'Not selected',
      type: String,
    },
    errorText: {
      default: '',
      type: String,
    },
    hasError: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      selectValue: this.value,
      focused: false,
    };
  },
  computed: {
    /**
     * Classes for select
     * @return {Array<string>}
     */
    selectClasses() {
      return [
        'select-field',
        this.isVisibleError ? '_error' : '',
        this.focused ? '_focused' : '',
        this.selectValue === '' ? '_empty' : '',
        this.disabled ? '_disabled' : '',
      ];
    },

    selectedLabel() {
      const selectedItem = find(this.options, { value: this.selectValue });
      return selectedItem ? selectedItem.label : this.placeholder;
    },

    optionsView() {
      if (this.hasEmptyValue) {
        return [
          {
            label: this.placeholder,
            value: '',
          },
          ...this.options,
        ];
      }

      return this.options;
    },

    /**
     * Error is visible if it exists and error text isn't empty
     * @return {boolean}
     */
    isVisibleError() {
      return !!(this.hasError && this.errorText);
    },
  },
  watch: {
    value(val) {
      this.selectValue = val;
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
$error-input-color: #ff6f6f;
$hover-option-color: #deebfa;

$primary-input-size: 16px;
$secondary-input-size: 14px;

.select-field {
  background-color: $input-background-color;
  box-sizing: border-box;
  color: $primary-input-color;
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  font-size: $primary-input-size;
  padding: 24px 0;
  position: relative;
  width: 100%;

  &:after {
    content: "";
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
      border-color: transparent;
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
    &:after {
      border-top-color: $focus-input-color;
    }

    & > .label {
      border-color: transparent;
      color: $focus-input-color;
    }

    & > .box {
      transform: scaleY(1);
    }
  }

  &._error {
    & > .label {
      border-color: $error-input-color;
    }
  }

  &._disabled {
    color: $secondary-input-color;
    pointer-events: none;
  }
}
.selected {
  display: block;
  height: 32px;
  line-height: 32px;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.2s ease-out;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border-bottom: 1px solid #e5e5e5;
}
.box {
  background-color: $input-background-color;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  left: -16px;
  position: absolute;
  z-index: 10;
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
  background-image: linear-gradient(
    0deg,
    $input-background-color 0%,
    rgba($input-background-color, 0) 100%
  );
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

  &._empty {
    color: $secondary-input-color;
  }
}
input {
  height: 0;
  visibility: hidden;
  width: 0;
}
.additional,
.label {
  display: block;
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
  border-bottom: 1px solid #e5e5e5;
  height: 32px;

  &._required {
    &:after {
      content: "*";
      color: #f00;
    }
  }
}
.additional {
  font-size: $secondary-input-size;
  max-width: 50%;
  right: 0;
  top: 0;
}
.error {
  bottom: 0;
  color: $error-input-color;
  display: block;
  font-size: $secondary-input-size;
  position: absolute;
}
</style>
