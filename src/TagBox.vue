<template>
<div 
  class="tag-box"
  :class="[`_indent-${indent}`, {'_no-tags': !tags.length}]"
>
  <span
    v-for="(tag, index) in tags"
    :key="index"
    :class="['tag', `_color-${index % 16 + 1}`]"
    @click="$emit('removeTag', tag)"
  >
    {{ getTagLabel(tag) }}
  </span>
</div>
</template>

<script>
import { includes } from 'lodash-es';

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

    indent: {
      type: String,
      default: 'default',
      validator(value) {
        return includes(['default', 'shallow'], value);
      },
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
// @TODO - Move to gui (@see https://protocol1.atlassian.net/browse/QILIN-49)
$color-1: #55d287;
$color-2: #ff6f6f;
$color-3: #ffb45b;
$color-4: #3787ff;
$color-5: #9371dc;
$color-6: #abd533;
$color-7: #ffd76f;
$color-8: #4d6dc1;

$tag-colors: (
  color-1: $color-1,
  color-2: $color-2,
  color-3: $color-3,
  color-4: $color-4,
  color-5: $color-5,
  color-6: $color-6,
  color-7: $color-7,
  color-8: $color-8,
  color-9: rgba($color-1, 0.5),
  color-10: rgba($color-2, 0.5),
  color-11: rgba($color-3, 0.5),
  color-12: rgba($color-4, 0.5),
  color-13: rgba($color-5, 0.5),
  color-14: rgba($color-6, 0.5),
  color-15: rgba($color-7, 0.5),
  color-16: rgba($color-8, 0.5),
);

.tag-box {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 8px 0;

  &._indent-shallow {
    padding-bottom: 0;

    &._no-tags {
      padding-top: 0;
    }
  }
}
.tag {
  position: relative;
  font-size: 16px;
  height: 28px;
  line-height: 28px;
  border-radius: 14px;
  color: #333;
  padding: 0 16px;
  margin-bottom: 8px;
  margin-right: 8px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &:after {
    position: absolute;
    width: 16px;
    height: 16px;
    content: '\00d7';
    opacity: 0;
    right: 6px;
    top: 6px;
    border-radius: 50%;
    transition: opacity 0.3s ease-out;
    text-align: center;
    line-height: 16px;
    font-weight: bold;
  }

  &:hover {
    &:after {
      opacity: 1;
    }
  }

  @each $tag, $color in $tag-colors {
    &._#{$tag} {
      background-color: $color;

      &:after {
        background-color: $color;
        box-shadow: 0 0 8px 4px $color;
      }
    }
  }
}
</style>
