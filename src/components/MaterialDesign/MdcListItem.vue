<template lang="pug">
  li.mdc-list-item(:class="classes" v-ripple)
    // Leading icon
    i.material-icons.mdc-list-item__graphic(aria-hidden="true" v-if="leadingIcon") {{ leadingIcon }}
    slot
      // Single-line
      span.mdc-list-item__text.single-line {{ text }}
      // Two-line
      span.mdc-list-item__text.two-line
        span.mdc-list-item__primary-text {{ text }}
        span.mdc-list-item__secondary-text(v-if="secondaryText") {{ secondaryText }}
    // Trailing icon
    span.mdc-list-item__meta.material-icons(aria-hidden='true' v-if="trailingIcon") {{ trailingIcon }}
</template>

<script>
import Ripple from './Directives/Ripple.js'

export default {
  directives: { Ripple },
  props: {
    activated: false,
    selected: false,
    text: String,
    leadingIcon: String,
    trailingIcon: String,
    secondaryText: String
  },
  computed: {
    classes () {
      return {
        'mdc-list-item--activated': this.activated,
        'mdc-list-item--selected': this.selected
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.mdc-list-item__text
  text-align left

.single-line, .two-line
    display none
.mdc-list:not(.mdc-list--two-line)
  .single-line
    display initial
.mdc-list--two-line
  .two-line
    display initial
</style>
