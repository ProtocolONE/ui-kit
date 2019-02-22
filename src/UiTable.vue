<template>
<div class="ui-table">
  <slot />
</div>
</template>

<style lang="scss" scoped>
.ui-table {
  display: table;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: -1px;
}
</style>
