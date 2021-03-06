<template>
<div
  v-clickaway="blur"
  class="date-input"
>
  <TextField
    :has-error="hasError"
    :label="dateLabel"
    :error-text="typeDateErrorText"
    :value="formatDate"
    @input="changeDateByInput"
    @focus="focus"
  />
  <div :class="datepickerClasses">
    <Datepicker
      :inline="true"
      :language="language"
      :monday-first="mondayFirst"
      :value="localDate"
      @selected="changeDateByPicker"
    />
  </div>
</div>
</template>

<script>
import { format, parse } from 'date-fns';
import * as locales from 'date-fns/locale';
import { directive as clickaway } from 'vue-clickaway';
import Datepicker from 'vuejs-datepicker';
import * as langs from 'vuejs-datepicker/dist/locale';
import TextField from './TextField.vue';

export default {
  directives: { clickaway },
  components: { Datepicker, TextField },
  model: {
    prop: 'date',
    event: 'input',
  },
  props: {
    date: {
      default: 0,
      type: [Date, Number, String],
    },
    dateLabel: {
      default: 'Date',
      type: String,
    },
    locale: {
      default: 'en',
      type: String,
    },
    typeDateErrorText: {
      default: 'Invalid date',
      type: String,
    },
  },
  data() {
    return {
      datepickerOpened: false,
      format: 'MMMM d, yyyy',
      hasError: false,
      localDate: this.translateUnixTimeIntoDate(this.date),
    };
  },
  computed: {
    datepickerClasses() {
      return ['datepicker', this.datepickerOpened ? '_opened' : '', this.hasError ? '_error' : ''];
    },
    formatDate() {
      const locale = locales[this.locale];

      return this.localDate ? format(this.localDate, this.format, { locale }) : '';
    },
    language() {
      return langs[this.locale];
    },
    mondayFirst() {
      return this.locale !== 'en';
    },
  },
  watch: {
    date(value) {
      this.localDate = this.translateUnixTimeIntoDate(value);
    },
  },
  methods: {
    blur() {
      this.datepickerOpened = false;
    },
    changeDateByPicker(value) {
      this.hasError = false;
      this.localDate = value;
      this.$emit('input', new Date(value.toDateString()).getTime());
    },
    focus() {
      this.datepickerOpened = true;
    },
    changeDateByInput(value) {
      if (value === '') {
        this.hasError = false;
        this.localDate = null;
        this.$emit('input', this.localDate);
        return;
      }

      const locale = locales[this.locale];
      const localDate = parse(value, this.format, new Date().getTime(), { locale });

      if (localDate.toString() === 'Invalid Date') {
        this.hasError = true;
        return;
      }

      this.hasError = false;
      this.localDate = localDate;
      this.$emit('input', new Date(localDate.toDateString()).getTime());
    },

    translateUnixTimeIntoDate(rawTime) {
      if (!rawTime || typeof rawTime === 'object') {
        return null;
      }
      const timeLength = String(rawTime).length;

      if (timeLength === 10) {
        return new Date(rawTime * 1000);
      }
      return new Date(rawTime);
    },
  },
};
</script>

<style scoped lang="scss">
.date-input {
  position: relative;
  z-index: 1;
}
.datepicker {
  position: absolute;
  top: 56px;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 0.2s ease-out, translateY 0.2s ease-out;

  &._opened {
    transform: scaleY(1);
  }
  &._error {
    transform: translateY(24px);
  }
}
</style>
