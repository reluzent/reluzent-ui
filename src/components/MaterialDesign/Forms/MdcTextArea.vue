<template lang="pug">
  mdc-text-base(v-bind="$props").mdc-text-field--textarea
    textarea.mdc-text-field__input(
      :rows="rows"
      :cols="cols"
      :required="required"
      :minlength="minlength"
      :maxlength="maxlength"
      :value="value"
      @input="input"
    )
</template>

<script>
import MdcTextBase from '../Base/MdcTextBase'
import Validation from '../../Tools/Mixins/Validation.js'

export default {
  extends: MdcTextBase,
  components: { MdcTextBase },
  mixins: [Validation],
  props: {
    rows: Number,
    cols: Number
  },
  methods: {
    input(val) {
      if (typeof val === 'object')
        return this.$emit('input', val.target.value)

      return this.$emit('input', val)
    }
  }
}
</script>
<style lang="stylus" scoped>
.mdc-text-field--textarea
  overflow visible
.mdc-text-field--textarea >>> .mdc-floating-label
  width fit-content
  float left
  clear left
</style>
