<template>
<div class="textarea">
  <label :class="['label', { '_required': required }]">
    {{ label }}
  </label>
  <textarea
    v-text="value"
    :disabled="disabled"
    :class="['input', { '_bordered': isBordered, '_disabled': disabled }]"
    :style="{ height: `${countLines * 32}px`}"
    @input="$emit('input', $event.target.value)"
  />
</div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    countLines: {
      default: 3,
      type: Number,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    isBordered: {
      default: false,
      type: Boolean,
    },
    label: {
      default: 'Label',
      type: String,
    },
    required: {
      default: false,
      type: Boolean,
    },
    value: {
      required: true,
      type: String,
    },
  },
}
</script>

<style scoped lang="scss">
.textarea {
  padding: 24px 0;
}
.label {
  color: #b1b1b1;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &._required {
    &:after {
      content: '*';
      color: #f00;
    }
  }
}
.input {
  background-color: #fff;
  border-width: 0;
  border-bottom: 1px solid #e5e5e5;
  box-sizing: border-box;
  color: #333;
  min-height: 32px;
  line-height: 32px;
  outline: none;
  padding: 0;
  width: 100%;
  display: block;

  &._bordered {
    border: 1px solid #e5e5e5;
    padding: 0 12px;
    border-radius: 2px;
  }

  &._disabled {
    color: #b1b1b1;
    pointer-events: none;
  }
}
</style>