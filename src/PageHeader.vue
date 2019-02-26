<template>
<div class="page-header">
  <div class="breadcrumbs-and-title">
    <ul
      v-if="breadcrumbs.length"
      class="breadcrumbs"
    >
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        class="breadcrumbs-item"
      >
        <IconBackpointer
          v-if="index === 0" 
          class="breadcrumb-icon"
        />
        <slot
          name="breadcrumb"
          :breadcrumb="breadcrumb"
        >
          <template
            v-if="breadcrumb.url"
          >
            <component
              :is="routerComponentName"
              v-if="breadcrumb.router !== false"
              :to="breadcrumb.url"
            >
              {{ breadcrumb.label }}
            </component>
            <a 
              v-else
              :href="breadcrumb.url"
              v-text="breadcrumb.label"
            />
          </template>
          <span
            v-else
            v-text="breadcrumb.label"
          />
        </slot>
      </li>
    </ul>
    <Header level="1">
      {{ title }}
      <slot name="title" />
    </Header>
  </div>

  <slot
    name="search"
    class="search"
  />

  <slot
    name="hint"
    class="hint"
  />

  <slot
    name="right"
    class="right"
  />
</div>
</template>

<script>
import Header from './Header.vue';
import IconBackpointer from './IconBackpointer.vue';

export default {
  name: 'PageHeader',

  components: {
    Header,
    IconBackpointer,
  },

  props: {
    title: {
      type: String,
    },
    /**
     * @typedef {{label: string, url?: string, router?: boolean}} Breadcrumb
     * @type {Breadcrumb[]}
     */
    breadcrumbs: {
      type: Array,
      default: () => [],
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
      return '';
    },
  },

  created() {
    /**
     * set class from slot name to slot container
     * @TODO - remove this kostil' on new major version
     */
    Object.keys(this.$slots).forEach(slotName => {
      this.$slots[slotName][0].data.class = slotName;
    });
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  padding: 0 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  height: 84px;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.07);
  background: #fff;
}

.breadcrumbs-and-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.right,
.hint,
.search {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.hint {
  line-height: 17px;
  font-size: 12px;

  color: #b1b1b1;
}

.breadcrumbs {
  list-style: none;
  margin: 0 0 5px;
  padding: 0;
  display: flex;
  flex-direction: row;
}

.breadcrumbs-item {
  color: #b1b1b1;
  font-size: 14px;
  display: flex;
  align-items: center;

  &:after {
    content: '/';
    margin: 0px 4px;
  }

  &:last-child:after {
    display: none;
  }

  a {
    color: inherit;
  }
}

.breadcrumb-icon {
  margin-right: 8px;
}
</style>
