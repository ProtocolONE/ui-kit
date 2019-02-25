<template>
<div
  class="ui-table-row"
  :class="{
    '_head': isHead,
    '_hoverable': isHoverable,
    '_clickable': url
  }"
  @click="handleRowClick"
>
  <slot />
</div>
</template>

<script>
export default {
  name: 'UiTableRow',

  props: {
    isHead: {
      type: Boolean,
      default: false,
    },
    isHoverable: {
      type: Boolean,
      default: true,
    },
    url: {
      type: String,
    },
  },

  methods: {
    handleRowClick() {
      if (this.url) {
        this.$router.push(this.url);
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.ui-table-row {
  display: table-row;

  &._clickable:hover {
    background: #e3eeff;
  }

  &._clickable {
    cursor: pointer;
  }
}
</style>
