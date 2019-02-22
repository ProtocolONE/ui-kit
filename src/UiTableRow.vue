<template>
<div
  class="ui-table-row"
  :class="{'_head': isHead}"
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
  },
};
</script>


<style lang="scss" scoped>
.ui-table-row {
  display: table-row;
}
</style>
