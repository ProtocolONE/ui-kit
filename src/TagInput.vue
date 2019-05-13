<template>
<div
  class="tag-input"
  :class="`_indent-${indent}`"
>
  <TagBox
    :tags="localSelectedTags"
    :indent="indent"
    @removeTag="removeTag"
  />
  <div
    v-clickaway="blur"
    :class="['field', fieldFocused ? '_focused' : '']"
  >
    <div class="field-input">
      <TextField
        v-model="textFieldValue"
        :label="label"
        @input="search"
        @focus="focus"
        @blur="textFieldValue = ''"
      />
    </div>

    <TagList
      class="list-tag"
      :tags="unselectedTags"
      @addTag="addTag"
    />
  </div>
</div>
</template>

<script>
import { directive as clickaway } from 'vue-clickaway';
import { concat, without, includes } from 'lodash-es';
import TagBox from './TagBox.vue';
import TagList from './TagList.vue';
import TextField from './TextField.vue';

export default {
  directives: {
    clickaway,
  },
  components: { TagBox, TagList, TextField },
  model: {
    prop: 'selectedTags',
    event: 'change',
  },
  props: {
    label: {
      default: 'List of tags',
      type: String,
    },
    /**
     * @typedef {string | {label: string, id: string}} Tag
     * @type {Tag[]}
     */
    selectedTags: {
      default: () => [],
      type: Array,
    },
    /**
     * @typedef {string | {label: string, id: string}} Tag
     * @type {Tag[]}
     */
    tags: {
      default: () => [],
      type: Array,
    },

    indent: {
      type: String,
      default: 'default',
      validator(value) {
        return includes(['default', 'shallow'], value);
      },
    },
  },
  data() {
    return {
      localTags: this.tags,
      localSelectedTags: this.selectedTags,
      fieldFocused: false,
      textFieldValue: '',
    };
  },
  computed: {
    searchedTags() {
      const localSelectedTagsValues = this.getTagValuesArray(this.localSelectedTags);
      return this.tags.filter(tag => {
        const tagId = typeof tag === 'string' ? tag : tag.id;
        return !includes(localSelectedTagsValues, tagId);
      });
    },
    unselectedTags() {
      const localSelectedTagsValues = this.getTagValuesArray(this.localSelectedTags);
      return this.localTags.filter(tag => {
        const tagId = typeof tag === 'string' ? tag : tag.id;
        return !includes(localSelectedTagsValues, tagId);
      });
    },
  },
  watch: {
    selectedTags(val) {
      this.localSelectedTags = val;
    },
    tags(val) {
      this.localTags = val;
    },
  },
  methods: {
    getTagValuesArray(array) {
      return array.map(tag => (typeof tag === 'string' ? tag : tag.id));
    },
    blur() {
      this.fieldFocused = false;
    },
    focus() {
      this.fieldFocused = true;
    },
    addTag(tag) {
      this.localSelectedTags = concat(this.localSelectedTags, tag);
      this.$emit('change', this.localSelectedTags);
    },
    removeTag(tag) {
      this.localSelectedTags = without(this.localSelectedTags, tag);
      this.$emit('change', this.localSelectedTags);
    },
    search(value) {
      this.localTags = this.searchedTags.filter(tag => {
        const tagLabel = typeof tag === 'string' ? tag : tag.label;
        return includes(tagLabel, value);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.tag-input {
  padding: 24px 0;
  width: 100%;

  &._indent-shallow {
    padding: 0;
  }
}
.field {
  max-width: 320px;
  position: relative;

  &._focused {
    & > .list-tag {
      transform: scaleY(1);
    }
  }
}

.field-input {
  position: relative;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 40px;
    border: 4px solid transparent;
    border-top: 4px solid #b1b1b1;

    .field._focused & {
      border-top-color: #3787ff;
    }
  }
}
.list-tag {
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.2s ease-out;
}
</style>
