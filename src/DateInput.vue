<template>
<div class="date-input">
  <Datepicker
    :value="date"
    @selected="changeDate"
  />
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
  components: { Datepicker },
  props: {
    date: {
      default: 0,
      type: Date,
    },
  },
  data() {
    return {
      localDate: this.date,
    };
  },
  computed: {
    
  },
  methods: {
    changeDate(value) {
      console.error(value);
    },
  },
};
</script>

<style scoped lang="scss">

</style>
