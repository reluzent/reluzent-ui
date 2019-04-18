<template lang="pug">
  .mdc-text-field.mdc-text-field--outlined.mb-10(:class="classes")
    // Leading Icon
    i.material-icons.mdc-text-field__icon(role="button" v-if="leadingIcon") {{ leadingIcon }}
    // Input slot
    slot
    // Trailing Icon
    i.material-icons.text-dark-grey.leading-loose.pt-1.w-16.z-1(role="button" v-if="trailingIcon" @click="trailingClick") {{ trailingIcon }}
    // Input options
    label.mdc-floating-label(:class="{ 'mdc-floating-label--float-above bg-white z-1 px-2 ml-1': floatingLabel }") {{ label }}
    .mdc-notched-outline__idle(:class="{ 'border-primary border-2': isFocus }")
    .mdc-text-field-helper-text(aria-hidden="true" v-if="help") {{ help }}
</template>

<script>
export default {
  props: {
    // Options
    label: String,
    name: String,
    type: {
      type: String,
      default: 'text'
    },
    help: String,
    leadingIcon: String,
    trailingIcon: String,
    invalid: Boolean,

    // V-model
    value: [String, Date, Number],

    // Classes
    disabled  : Boolean,
    isFocus   : Boolean
  },
  computed: {
    classes() {
      return {
        'mdc-text-field--disabled': this.disabled,
        'mdc-text-field--help': this.help || this.invalid,
        'mdc-text-field--with-leading-icon': this.leadingIcon,
        'mdc-text-field--focused': this.isFocus || this.value,
        'mdc-text-field--invalid': this.invalid
      }
    },
    floatingLabel() {
      return this.isFocus || this.value || this.type === 'date'
    }
  },
  methods: {
    trailingClick() {
      this.$emit('trailing')
    }
  }
}
</script>

<style lang="stylus">
.mdc-notched-outline > svg
  left 0

.mdc-text-field > input
  z-index 1

.mdc-text-field:not(.mdc-text-field--disabled)
  background-color transparent

// Fix margins (Help text)
.mdc-text-field
  overflow      visible !important
  margin-bottom 1.5rem
  .mdc-floating-label
    text-align  left

// Help text
.mdc-text-field-helper-text
  color rgba(0,0,0,.6)
  opacity 1 !important
  position absolute
  bottom -20px
  left 12px
  white-space   nowrap
  overflow      hidden
  text-overflow ellipsis

// Invalid case
.mdc-text-field--invalid
  .mdc-notched-outline__idle
    border-color red !important
  .mdc-text-field-helper-text, .mdc-floating-label
    color red !important

// Icon no outlined
.mdc-text-field--with-leading-icon
  .mdc-text-field__input
    margin-left 0
    padding-left 48px !important
  .mdc-floating-label
    left 48px !important

// Fix box
.mdc-text-field::before, .mdc-text-field::after
  width 100% !important
  height 100% !important
  border-radius 0 !important
  top 0 !important
  left 0 !important
</style>

<style lang="scss">
@import "@material/textfield/mdc-text-field";
</style>
