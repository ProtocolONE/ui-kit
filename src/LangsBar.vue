<template>
<div class="langs-bar">
  <LangButton
    v-for="lang in list"
    :key="lang"
    class="lang"
    :filled="filledLang(lang)"
    :selected="lang === currentLang"
    :text="lang"
    @click.native="onSelect(lang)"
  />
</div>
</template>

<script>
import { includes } from 'lodash-es';
import LangButton from './LangButton';

export default {
  components: { LangButton },
  props: {
    list: {
      type: Array,
      default: () => ['en', 'ru', 'fr', 'ptbr'],
    },
    filledList: {
      type: Array,
      default: () => [],
    },
    selectedLang: {
      type: String,
      default: 'en',
    },
  },
  data() {
    return {
      currentLang: this.selectedLang,
    };
  },
  watch: {
    selectedLang(lang) {
      this.currentLang = lang;
    },
  },
  methods: {
    filledLang(lang) {
      return includes(this.filledList, lang);
    },
    onSelect(lang) {
      this.currentLang = lang;
      this.$emit('change', lang);
    },
  },
};
</script>

<style scoped lang="scss">
.lang + .lang {
  margin-left: 4px;
}
</style>
