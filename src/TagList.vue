<template>
<div class="tag-list">
  <div class="list">
    <div
      v-for="(tag, index) in tags"
      :key="index"
      class="tag"
      @click="$emit('addTag', tag)"
    >
      {{ getTagLabel(tag) }}
      <span class="add-tag-label">
        {{ addTagLabel }}
      </span>
    </div>
  </div>
  <div
    v-if="tags.length > 5"
    class="overlay"
  />
</div>
</template>

<script>
export default {
  props: {
    /**
     * @typedef {string | {label: string, id: string}} Tag
     * @type {Tag[]}
     */
    tags: {
      default: () => [],
      type: Array,
    },
    addTagLabel: {
      default: 'Add',
      type: String,
    },
  },

  methods: {
    getTagLabel(tag) {
      return typeof tag === 'string' ? tag : tag.label;
    },
  },
};
</script>

<style lang="scss" scoped>
.tag-list {
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  left: -16px;
  position: absolute;
  text-overflow: ellipsis;
  top: 56px;
  white-space: nowrap;
  width: calc(100% + 32px);
  z-index: 10;
}
.list {
  max-height: 220px;
  overflow-x: hidden;
  width: 100%;
}
.tag {
  cursor: pointer;
  display: block;
  height: 40px;
  line-height: 40px;
  padding: 0 44px 0 16px;
  margin: 0;
  color: #333;
  position: relative;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    background-color: #deebfa;

    & > .add-tag-label {
      opacity: 1;
    }
  }
}
.add-tag-label {
  position: absolute;
  right: 16px;
  top: 0;
  line-height: 40px;
  color: #2b88f5;
  opacity: 0;
  transition: opacity 0.2s linear;
}
.overlay {
  background-image: linear-gradient(0deg, #fff 0%, rgba(#fff, 0) 100%);
  bottom: 0;
  pointer-events: none;
  height: 40px;
  left: 0;
  min-height: 40px;
  position: absolute;
  right: 0;
}
</style>
