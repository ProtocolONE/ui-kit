<template>
<component
  :is="tagName"
  class="ui-table-row"
  :class="{
    '_head': isHead,
    '_hoverable': isHoverable,
    '_clickable': link
  }"
  :to="link && link.router ? link.url : null"
  :href="link ? link.url : null"
>
  <slot />
</component>
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
    link: {
      type: Object,
    },
  },

  computed: {
    routerComponentName() {
      if (this.$options.components.NuxtLink) {
        return 'NuxtLink';
      }
      if (this.$options.components.RouterLink) {
        return 'RouterLink';
      }
      return 'a';
    },
    tagName() {
      if (!this.link) {
        return 'div';
      }

      if (this.link && this.link.router) {
        return this.routerComponentName;
      }

      return 'a';
    },
  },
};
</script>


<style lang="scss" scoped>
.ui-table-row {
  display: table-row;
  text-decoration: none;

  &._hoverable:hover {
    background: #e3eeff;
  }

  &._clickable {
    cursor: pointer;
  }
}
</style>
