
<template>
  <div class="langs-bar">

    <LangButton v-for="(val) in list"
                @click="onSelect(val)"
                :filled="!!occupied[val]"
                :select="val === value"
                :key="val"
                :text="val"/>

  </div>
</template>

<script type="ts">
  import Vue from 'vue'
  import LangButton from './LangButton'

  export default Vue.extend({
    components: {LangButton},
    props: {
      list: {
        type: Array,
        default: () => ['en', 'ru', 'fr', 'ptbr'],
      },
      occupied: {
        type: Object,
        default: () => {{}},
      },
      value: {
        type: String,
        default: 'en',
      }
    },
    name: "LangsBar",
    methods: {
      onSelect(value){
        this.$emit('change', value);
      }
    }
  })
</script>

<style scoped lang="scss">
  .langs-bar {

  }
</style>
