<template lang="pug">
  .mdc-text-field.mb-10(:class="classes")
    // Leading Icon
    i.material-icons.mdc-text-field__icon(tabindex="0" role="button" v-if="leadingIcon" @focus="setFocus") {{ leadingIcon }}
    // Input slot
    slot
    // Input options
    label.mdc-floating-label.bg-white.z-1.px-2.ml-1(:class="{ 'mdc-floating-label--float-above': isFocus || value }") {{ label }}
    .mdc-notched-outline__idle(v-if="outlined" :class="{ 'border-primary border-2': isFocus }")
    .mdc-text-field-helper-text(aria-hidden="true" v-if="help") {{ help }}
</template>

<script>
import { MDCTextField } from '@material/textfield'

export default {
  props: {
    // Options
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    help: String,
    leadingIcon: String,

    // Validations
    required: Boolean,
    minlength: String,
    maxlength: String,
    pattern: String,
    invalid: Boolean,
    name: String,

    // V-model
    value: [String, Date, Number],

    // Classes
    fullwidth : Boolean,
    dense     : Boolean,
    outlined  : {
      type: Boolean,
      default: true
    },
    disabled  : Boolean,
    box       : Boolean,
    isFocus   : Boolean
  },
  computed: {
    classes() {
      return {
        'mdc-text-field--fullwidth': this.fullwidth,
        'mdc-text-field--dense': this.dense,
        'mdc-text-field--outlined': this.outlined,
        'mdc-text-field--disabled': this.disabled,
        'mdc-text-field--help': this.help || this.invalid,
        'mdc-text-field--with-leading-icon': this.leadingIcon,
        'mdc-text-field--box': this.box,
        'mdc-text-field--focused': this.isFocus || this.value,
        'mdc-text-base--invalid': this.invalid
      }
    }
  },
  methods: {
    setFocus(val) {
      if (this.textField && this.textField.input_ && this.textField.input_.focus)
        this.textField.input_.focus()
    }
  },
  mounted() {
    this.textField = new MDCTextField(this.$el)
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
.invalid, .mdc-text-base--invalid, .mdc-text-field--invalid
  .mdc-notched-outline__idle
    border-color red !important
  .mdc-text-field-helper-text, .mdc-floating-label
    color red !important

// Fix full-width
.mdc-text-field--box
  background-color whitesmoke !important
.mdc-text-field--fullwidth:not(.mdc-text-field--with-leading-icon)
  .mdc-text-field__input
    padding-left 12px !important

// Icon no outlined e fullwidth
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

.mdc-text-field--fullwidth:not(.mdc-text-field--textarea)
  padding 12px 0 0 0
</style>

<style lang="scss">
@import "@material/textfield/mdc-text-field";
</style>
