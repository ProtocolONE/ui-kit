<template>
<div class="base-checkbox">
    <input
        v-bind="{ checked, disabled, id }"
        class="input"
        type="checkbox"
        @change="emitChange"
    >
    <label
        :for="id"
        :class="checkboxClasses"
    >
        <svg viewBox="0,0,50,50">
            <path d="M12 27 L 20 35 L 40 15" />
        </svg>
    </label>
</div>
</template>

<script>
import { includes, uniqueId } from 'lodash-es';

export default {
    props: {
        checked: {
            default: false,
            type: Boolean,
        },
        disabled: {
            default: false,
            type: Boolean,
        },
        size: {
            default: 'default',
            type: String,
            validator(value) {
                return includes(['default'], value);
            },
        },
    },
    computed: {
        /**
         * Classes for checkbox
         * @return {Array<string>}
         */
        checkboxClasses() {
            return ['label', `_${this.size}`, this.disabled ? '_disabled' : ''];
        },
        /**
         * Unique ID for checkbox element
         * @return {string}
         */
        id() {
            return uniqueId('checkbox');
        },
    },
    methods: {
        /**
         * @param {Event} event
         */
        emitChange(event) {
            // If button has disabled we shoudn't send events
            if (this.disabled) {
                return;
            }

            this.$emit('change', event.target.checked);
        },
    },
};
</script>

<style scoped lang="scss">
/** @TODO - move to gui consts, fix color and typographics consts */
$checkbox-color: #fff;
$checkbox-check-color: #333;
$disabled-checkbox-color: #e1e1e1;
$checkbox-border-color: #b1b1b1;
$hover-checkbox-border-color: #3787ff;

.base-checkbox {
    display: inline-block;
    position: relative;
}
.input {
    height: 0;
    position: absolute;
    visibility: hidden;
    width: 0;

    &:checked + .label {
        border-color: $hover-checkbox-border-color;
    }
    &:checked + .label > svg > path {
        stroke-dashoffset: 0;
    }
}
.label {
    border-radius: 3px;
    border: 2px solid $checkbox-border-color;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease-out;
    background-color: $checkbox-color;
    height: 20px;
    width: 20px;

    & > svg {
        pointer-events: none;
        vertical-align: top;

        & > path {
            fill: none;
            stroke-dasharray: 100;
            stroke-dashoffset: 101;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 5px;
            stroke: $checkbox-check-color;
            transition: all 0.2s ease-out;
        }
    }

    &:hover {
        border-color: $hover-checkbox-border-color;
    }

    &._disabled {
        background-color: $disabled-checkbox-color;
        border-color: $disabled-checkbox-color;
    }
}
</style>
