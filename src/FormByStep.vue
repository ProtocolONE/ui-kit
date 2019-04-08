<template>
<div class="form-by-steps">
  <div class="form-controls">
    <ul class="steps-list">
      <li
        v-for="item in steps"
        :key="item.label"
        class="steps-list-item"
      >
        <a
          class="steps-list-link"
          :class="{'_active': item.value === currentStep}"
          href="#"
          @click.prevent="$emit('stepSelected', item.value)"
        >
          {{ item.label }}

          <IconCheck v-if="item.status === 'complete'" />
          <IconIncomplete v-if="item.status === 'incomplete'" />
        </a>
      </li>
    </ul>

    <div class="side-footer">
      <slot name="side-footer" />
    </div>
  </div>
  <div
    class="form-contents"
    :class="{'_has-padding': contentsHasPadding}"
  >
    <slot />
  </div>
</div>
</template>

<script>
import IconCheck from './IconCheck.vue';
import IconIncomplete from './IconIncomplete.vue';

export default {
  name: 'FormBySteps',

  components: {
    IconCheck,
    IconIncomplete,
  },

  model: {
    prop: 'currentStep',
    event: 'stepSelected',
  },

  props: {
    currentStep: {
      required: true,
      type: String,
    },
    steps: {
      required: true,
      type: Array,
    },
    contentsHasPadding: {
      type: Boolean,
      default: true,
    }
  },
};
</script>

<style lang="scss" scoped>
.form-by-steps {
  display: flex;
  flex-direction: row;
}
.form-controls {
  background: #f6f6f6;
  box-shadow: inset -1px 0px 0px rgba(0, 0, 0, 0.06);
  width: 224px;
  display: flex;
  flex-direction: column;
}
.side-footer {
  padding: 24px 32px;
  color: #b1b1b1;
  font-size: 16px;
  line-height: 20px;
}
.form-contents {
  background: #fff;
  flex-grow: 1;

  &._has-padding {
    padding: 25px 35px;
  }
}
.steps-list {
  padding: 15px 0;
  margin: 0;
  list-style: none;
  flex-grow: 1;
}
.steps-list-link {
  font-size: 16px;
  line-height: 20px;
  color: #b1b1b1;
  display: block;
  height: 48px;
  padding: 0 32px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-decoration: none;

  &._active {
    color: #0c2441;
    background: rgba(188, 214, 244, 0.5);
  }
}
</style>
