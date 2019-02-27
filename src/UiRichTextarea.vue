<template>
<wysiwyg
  class="wysiwyg-editor"
  :placeholder="placeholder"
  :options="wysiwygOptions"
  :html="value"
  @change="$emit('input', $event)"
/>
</template>

<script>
import wysiwyg from 'vue-wysiwyg';

const wysiwygOptions = {
  iconOverrides: {},
  hideModules: {
    justifyLeft: true,
    justifyCenter: true,
    justifyRight: true,
    headings: true,
    link: true,
    code: true,
    orderedList: true,
    unorderedList: true,
    image: true,
    table: true,
    removeFormat: true,
    separator: true,
  },
  forcePlainTextOnPaste: true
};

export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  components: { wysiwyg: wysiwyg.component },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      wysiwygOptions,
    };
  },
};
</script>

<style scoped lang="scss">
@import '~vue-wysiwyg/dist/vueWysiwyg.css';
.wysiwyg-editor {
  margin: 8px 0;
}
</style>