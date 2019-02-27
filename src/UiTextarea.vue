<template>
<div class="textarea">
  <label
    class="label"
    v-text="label"
  />
  <textarea
    class="body"
    @input="$emit('input', $event.target.value)"
    v-text="value"
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
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'Label',
    },
  },
}
</script>

<style scoped lang="scss">
.textarea {
  margin-bottom: 60px;
}
.label {
  color: #b1b1b1;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.body {
  background-color: #fff;
  border-width: 0;
  border-bottom-width: 1px;
  border-color: #e5e5e5;
  box-sizing: border-box;
  color: #333;
  min-height: 63px;
  outline: none;
  padding: 0;
  width: 100%;
  display: block;
}
</style>