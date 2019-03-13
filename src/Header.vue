<script>
import { includes } from 'lodash-es';

export default {
  props: {
    /** Header level (h1-h4) */
    level: {
      required: true,
      type: String,
      validator(value) {
        return includes(['1', '2', '3', '4'], value);
      },
    },

    hasMargin: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
<div
  class="header"
  :class="{'_has-margin': hasMargin}"
>
  <component :is="`h${level}`">
    <slot />
  </component>
</div>
</template>

<style lang="scss" scoped>
.header {
  h1,
  h2,
  h3,
  h4 {
    color: #333333;
    margin: 0;
    display: flex;
    align-items: center;
  }

  h1 {
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    font-size: 28px;
  }

  h2 {
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-size: 22px;
  }

  h3 {
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    font-size: 18px;
  }

  h4 {
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    font-size: 16px;
  }

  &._has-margin {
    margin-bottom: 12px;
  }
}
</style>
