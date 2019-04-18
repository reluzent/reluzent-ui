<template lang="pug">
  div.mdc-form-field
    label(v-if="!leftCheck")
      // Label name
      slot
    div.mdc-checkbox.mdc-checkbox--upgraded(:class="{ 'mdc-checkbox--disabled': disabled }")
      input.mdc-checkbox__native-control(
        type="checkbox"
        :disabled="disabled"
        :value="value"
        :checked="value"
        @input="ev => $emit('input', ev.target.checked)"
        @keydown.enter="enter"
      )
      div.mdc-checkbox__background
        svg.mdc-checkbox__checkmark(viewBox="0 0 24 24")
          path.mdc-checkbox__checkmark-path(fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59")
        div.mdc-checkbox__mixedmark
    div.mdc-text-field-helper-text(aria-hidden="true" v-if="help") {{ help }}
    label(v-if="leftCheck")
      // Label name
      slot
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    leftCheck: {
      type: Boolean,
      default: false
    },
    help: {
      type: String
    }
  },
  computed: {
    classes() {
      return {
        'mdc-checkbox--anim-unchecked-checked': this.value
      }
    }
  },
  methods: {
    enter(ev) {
      ev.preventDefault()
      ev.stopPropagation()
      this.$emit('input', !this.value)
    }
  }
}
</script>
<style lang="scss">
@import "@material/checkbox/mdc-checkbox";
@import "@material/form-field/mdc-form-field";
</style>
