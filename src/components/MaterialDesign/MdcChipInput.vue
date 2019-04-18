<template lang="pug">
  .mdc-chip-input.mb-5
    mdc-text-field.w-full(v-show="!disabled" v-bind="$props" :hideInput="disabled" :type="type" :label="label" :mask="mask" :help="help" v-model="text" @change="change" ref="input" @enter="onEnter")

    .pl-4.text-xs.text-dark-grey.text-left(v-if="disabled") {{ label }}
    mdc-chip-set.w-full(:values="values" type="date" :editable="!disabled" @onRemove="onRemove")
</template>

<script>
import MdcChipSet from './MdcChipSet'
import MdcTextField from './Forms/MdcTextField'

export default {
  extends: MdcTextField,
  components: { MdcChipSet, MdcTextField },
  props: {
    value: {
      type: [String, Array]
    },
    type: String,
    cleanEnter: Boolean
  },
  data() {
    return {
      values: [],
      text: '',
      hasError: false
    }
  },
  methods: {
    onEnter() {
      if (this.values.indexOf(this.text) > -1)
        return (this.hasError = true)

      this.values.push(this.text)
      if (this.cleanEnter)
        this.text = ''
      this.$emit('input', this.values)
    },
    onRemove(chips) {
      this.values = chips
      this.$emit('input', this.values)
    },
    change(ev) {
      const value = ev.target.value || ''
      if (this.type === 'date' && value.match(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/g)) {
        this.onEnter()
      }
    }
  },
  created() {
    if (this.value && this.value.length > 0)
      this.values = this.value
  }
}
</script>
<style lang="stylus" scoped>
.mdc-chip-input
  height auto !important
  display block !important
  .mdc-text-field
    margin-bottom 15px !important
</style>
