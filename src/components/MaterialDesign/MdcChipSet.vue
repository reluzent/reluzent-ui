<template lang="pug">
  div.mdc-chip-set(:class="classes")
    div.mdc-chip.justify-center(v-for="(chip, index) in values" :key="chip.t || chip[prop] || chip" tabindex="0" :class="{ 'bg-secondary text-white': value === chip }" @click="onClick(chip)" v-ripple)
      // Leading icon
      i.material-icons.mdc-chip__icon.mdc-chip__icon--leading(v-if="chip.i") {{ chip.i }}

      // Text and Checkmark
      div.mdc-chip__checkmark(v-if="filter")
        svg.mdc-chip__checkmark-svg(viewBox='-2 -3 30 30')
          path.mdc-chip__checkmark-path(fill='none', stroke='black', d='M1.73,12.91 8.1,19.28 22.79,4.59')
      div.mdc-chip__text {{ (chip.t || chip[prop] || chip) | date }}

      // Trailing icon
      i.material-icons.mdc-chip__icon.mdc-chip__icon--trailing(tabindex="0" role="button" v-if="editable" @click="onRemove(chip)") cancelar
</template>

<script>
import { MDCChipSet } from '@material/chips'
import Ripple from './Directives/Ripple.js'
import Date from './Filters/Date.js'

export default {
  directives: { Ripple },
  props: {
    values: Array,
    editable: Boolean,
    type: String,

    // v-model
    value: {
      type: [String, Number, Object, Array]
    },

    // Classes
    choice: {
      type: Boolean,
      default: true
    },
    input: Boolean,
    filter: Boolean,
    prop: String
  },
  data() {
    return {
      filtered: []
    }
  },
  filters: {
    date(value) {
      if (value && value.match && value.match(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/g))
        return Date(value)
      return value
    }
  },
  computed: {
    classes() {
      return {
        'mdc-chip-set--choice': this.choice && !this.input && !this.filter,
        'mdc-chip-set--input': this.input,
        'mdc-chip-set--filter': this.filter
      }
    }
  },
  methods: {
    onClick(chip) {
      if (this.filter) {
        if (this.value.indexOf(chip) < 0) return this.$emit('input', [...this.value, chip])
        return this.$emit('input', this.value.filter(c => c !== chip))
      }
      if (this.value !== null && this.value !== undefined)
        return this.$emit('input', chip)
      return this.$emit('onSelect', chip)
    },
    onRemove(chip) {
      this.$emit('onRemove', this.values.filter(c => (c !== chip)))
    }
  },
  mounted() {
    this.chipSet = new MDCChipSet(this.$el)
  }
}
</script>
<style lang="stylus" scoped>
.mdc-chip-set
  max-height 100%
</style>
<style lang="scss">
@import "@material/chips/mdc-chips";
</style>
