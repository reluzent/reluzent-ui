<template lang="pug">
  form.mdc-card.mdc-form(@submit="submit")
    h6.mdc-typography--headline6.pb-4(v-if="label") {{ label }}
    div.flex.flex-col.content
      slot
    .flex.flex-row.justify-end
      div.flex.flex-row.mr-2
        slot(name="buttons")
      div.flex.flex-row(v-if="!hideButton")
        mdc-button(type="submit" raised) {{ labelButton }}
</template>
<script>
import MdcButton from '../MdcButton'

export default {
  components: { MdcButton },
  props: {
    label: String,
    labelButton: {
      type: String,
      default: 'Enviar'
    },
    buttonRaised: {
      type: Boolean,
      default: false
    },
    errorsName: Array,
    hideButton: Boolean,
    // v-model for cache
    value: [Array, Object]
  },
  methods: {
    submit(ev = new Event('nothing')) {
      ev.preventDefault()

      // Check if form is not valid
      if (this.$el.checkValidity && !this.$el.checkValidity())
        return false

      // Check if any field is not valid
      for (const elem of this.$el.elements) {
        if (elem.validity && !elem.validity.valid)
          return false
      }

      // Check if parent has $errors from v-valid directive
      if (this.errorsName && !this.errorsName.every(error => !this.$parent.$error[error]))
        return false
      else if (!Object.keys(this.$parent.$error).every(error => !this.$parent.$error[error]))
        return false

      // Ok
      this.$emit('submit', ev)
      return true
    }
  },
  beforeDestroy() {
    if (this.value)
      localStorage.setItem(this.label, JSON.stringify(this.value))
  },
  created() {
    if (localStorage[this.label])
      this.$emit('input', JSON.parse(localStorage.getItem(this.label)))
  }
}
</script>
<style lang="stylus" scoped>
  form
    padding 10px
    h6
      margin 10px
    > .content
      div > .mdc-text-field:last-child
        margin-right 0px
      div > .mdc-text-field
        margin-right 10px
</style>
<style lang="scss">
@import "@material/card/mdc-card";
@import "@material/elevation/mdc-elevation";
</style>
