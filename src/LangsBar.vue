
<template>
<div class="langs-bar">
  <LangButton
    v-for="(val) in list"
    :key="val"
    :filled="!!occupied[val]"
    :select="val === value"
    :text="val"
    @click="onSelect(val)"
  />
</div>
</template>

<script type="ts">
import LangButton from './LangButton';

export default {
  name: 'LangsBar',
  components: { LangButton },
  props: {
    list: {
      type: Array,
      default: () => ['en', 'ru', 'fr', 'ptbr'],
    },
    occupied: {
      type: Object,
      default: () => {},
    },
    value: {
      type: String,
      default: 'en',
    },
  },
  methods: {
    onSelect(value) {
      this.$emit('change', value);
    },
  },
};
</script>

<style scoped lang="scss">
.langs-bar {
}
</style>
