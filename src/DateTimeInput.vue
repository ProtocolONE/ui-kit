<template>
<div class="date-time">
  <DateInput
    :date="date"
    @input="dateChange"
  />
  <TimeInput
    :time="time"
    @input="timeChange"
  />
</div>
</template>

<script>
import { includes } from 'lodash-es';
import DateInput from './DateInput';
import TimeInput from './TimeInput';

/**
 * Parse date and time from timestamp
 * @param {Number} timestamp
 * @return {object<Number, Number>}
 */
function timestampParse(timestamp) {
  if (timestamp === 0) {
    return {
      date: 0,
      time: 0,
    };
  }

  const dateDelimeter = 24 * 60 * 60 * 1000;
  const date = new Date(Math.floor(timestamp / dateDelimeter));
  const time = new Date(timestamp % dateDelimeter);

  return {
    date,
    time,
  };
}

export default {
  components: { DateInput, TimeInput },
  props: {
    timestamp: {
      default: 0,
      type: Date,
    },
  },
  data() {
    const { date, time } = timestampParse(this.timestamp);

    return {
      date,
      time,
    };
  },
  watch: {
    timestamp(value) {
      const dateTime = timestampParse(value);

      this.date = dateTime.date;
      this.time = dateTime.time;
    },
  },
  methods: {
    dateChange(date) {

    },
    timeChange(time) {

    },
  },
};
</script>

<style scoped lang="scss">
.date-time {
  padding: 32px;
  max-width: 600px;
}
</style>
