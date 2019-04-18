<template lang="pug">
  mdc-text-base(v-bind="$props" :isFocus="isFocused" :invalid="invalidComputed")
    input.mdc-text-field__input(
      aria-controls="mdc-text-field"
      :type="type"
      :required="requiredComputed"
      :max="max"
      :min="min"
      :minlength="min"
      :maxlength="max"
      :pattern="patternComputed"
      step="0.25"
      :value="value"
      :invalid="invalidComputed"
      :name="name"
      @input.lazy="input"
      @focus="onFocus(true)"
      @blur="onFocus(false)"
      @keydown.enter.prevent.stop="$emit('enter')"
      @change="ev => $emit('change', ev)"
    )
</template>

<script>
import MdcTextBase from '../Base/MdcTextBase'
import Mask from '../../Tools/Mixins/Mask.js'
import Validation from '../../Tools/Mixins/Validation.js'

export default {
  extends: MdcTextBase,
  components: { MdcTextBase },
  mixins: [Mask, Validation],
  props: {
    mask: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isFocused: false,
      invalidRequired: false
    }
  },
  computed: {
    valueParsed() {
      return this.type === 'date' ? this.dateValue() : this.value
    },
    min() {
      return this.minlength || this.minMask || this.minValid
    },
    max() {
      return this.maxlength || this.maxMask || this.maxValid
    },
    maskLength() {
      return this.mask !== '' ? this.mask.length : null
    },
    requiredComputed() {
      return this.required || this.requiredValid
    },
    invalidComputed() {
      return this.invalid || this.invalidRequired || this.invalidValid
    },
    patternComputed() {
      if (this.type === 'date')
        return '^([123]0|[012][1-9]|31)(\.|-|/|,)(0[1-9]|1[012])(\.|-|/|,)(19[0-9]{2}|2[0-9]{3})$'// eslint-disable-line
      return this.pattern
    }
  },
  watch: {
    value(val) {
      this.invalidRequired = !val
    }
  },
  methods: {
    input(ev) {
      this.$emit('input', ev.target.value)
    },
    dateValue() {
      if (!this.value) return this.value

      var local = new Date(this.value)
      local.setMinutes(local.getMinutes() - local.getTimezoneOffset())
      return local.toJSON().slice(0, 10)
    },
    onFocus(val) {
      this.isFocused = val
      if (!val && !this.value && this.requiredComputed) {
        this.invalidRequired = true
      }
    }
  }
}
</script>
