<template>
<div class="date-time">
  <div class="date">
    <DateInput
      v-bind="{ date, dateLabel, locale, typeDateErrorText }"
      @input="dateChange"
    />
  </div>
  <div class="time">
    <TimeInput
      v-bind="{ time, timeLabel }"
      @input="timeChange"
    />
  </div>
</div>
</template>

<script>
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

  // One day in ms
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
      type: [Date, Number],
    },
    /** Label for date input */
    dateLabel: {
      default: 'Date',
      type: String,
    },
    locale: {
      default: 'en',
      type: String,
    },
    /** Label for time input */
    timeLabel: {
      default: 'Time',
      type: String,
    },
    typeDateErrorText: {
      default: 'Invalid date',
      type: String,
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
      this.date = date;
      this.$emit('input', date + this.time);
    },
    timeChange(time) {
      if (!this.date) {
        return;
      }

      this.time = time;
      this.$emit('input', this.date + time);
    },
  },
};
</script>

<style scoped lang="scss">
.date-time {
  width: 100%;
  display: flex;
  align-items: top;
  flex-wrap: wrap;
}
.date {
  margin-right: 32px;
  min-width: 170px;
  max-width: 300px;
  flex-grow: 1;
}
.time {
  min-width: 100px;
  max-width: 200px;
  flex-grow: 1;
}
</style>
