<template>
<div class="time-input">
  <Select
    :label="timeLabel"
    :options="times"
    :value="localTime"
    @input="changeTime"
  />
</div>
</template>

<script>
import Select from './Select.vue';

const ONE_HOUR = 60 * 60 * 1000;

/** Times array for select */
function getTimes() {
  return [...Array(24).keys()].map(value => {
    const hourStr = value < 10 ? `0${value}` : `${value}`;

    return {
      // label for hour
      label: `${hourStr}:00 UTC`,
      // timestamp for hour
      value: value * ONE_HOUR,
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
      times: getTimes(),
    };
  },
  computed: {
    localTime() {
      const timeNumber = new Date(this.time).getTime();

      return Math.ceil(timeNumber / ONE_HOUR) * ONE_HOUR;
    },
  },
  methods: {
    changeTime(value) {
      this.$emit('input', new Date(parseInt(value)).getTime());
    },
  },
};
</script>
