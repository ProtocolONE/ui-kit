<template>
<div class="tag-input">
  <TagBox
    :tags="localSelectedTags"
    @removeTag="removeTag"
  />
  <div
    v-clickaway="blur"
    :class="['field', fieldFocused ? '_focused' : '']"
  >
    <TextField
      :label="label"
      @input="search"
      @focus="focus"
    />
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
  props: {
    label: {
      default: 'List of tags',
      type: String,
    },
    selectedTags: {
      default: () => [],
      type: Array,
    },
    tags: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      localTags: this.tags,
      localSelectedTags: this.selectedTags,
      fieldFocused: false,
    };
  },
  computed: {
    searchedTags() {
      return without(this.tags, ...this.localSelectedTags);
    },
    unselectedTags() {
      return without(this.localTags, ...this.localSelectedTags);
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
      this.localTags = this.searchedTags.filter(tag => includes(tag, value));
    },
  },
};
</script>

<style scoped lang="scss">
.tag-input {
  padding: 24px 0;
  width: 100%;
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
.list-tag {
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.2s ease-out;
}
</style>