<template>
<div
  class="ui-table-cell"
  :class="{'_head': isHead}"
>
  <slot />
</div>
</template>

<script>
export default {
  name: 'UiTableRow',

  data() {
    return {
      isHead: this.$parent.isHead || false,
    };
  },
};
</script>

<style lang="scss" scoped>
.ui-table-cell {
  display: table-cell;
  padding: 16px 0 16px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  color: #0c2441;
  vertical-align: middle;

  &:first-child {
    padding-left: 26px;
  }

  &._head {
    padding-top: 10px;
    padding-bottom: 10px;
    background: #f6f6f6;
    color: #b1b1b1;
  }
}
</style>
