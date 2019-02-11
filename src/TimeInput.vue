<template>
<div class="time-input">
  <Select
    v-model="localTime"
    :label="timeLabel"
    :options="times"
    @input="changeTime"
  />
</div>
</template>

<script>
import Select from './Select.vue';

/** Times array for select */
function getTimes() {
  return [...Array(24).keys()].map(value => {
    const hourStr = value < 10 ? `0${value}` : `${value}`;

    return {
      // label for hour
      label: `${hourStr}:00 UTC`,
      // timestamp for hour
      value: value * 60 * 60 * 1000,
    };
  });
}

export default {
  components: { Select },
  props: {
    time: {
      default: 0,
      type: [Date, Number],
    },
    timeLabel: {
      default: 'Time',
      type: String,
    },
  },
  data() {
    return {
      localTime: this.time,
      times: getTimes(),
    };
  },
  methods: {
    changeTime(value) {
      this.$emit('input', new Date(parseInt(value)).getTime());
    },
  },
};
</script>
