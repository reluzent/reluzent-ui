<template lang="pug">
  button.mdc-button(:class="classes" v-ripple)
    i.material-icons.mdc-button__icon(aria-hidden="true" v-if="icon") {{ icon }}
    slot
    i.material-icons.mdc-button__icon(aria-hidden="true" v-if="trailingIcon") {{ trailingIcon }}
</template>

<script>
import Ripple from './Directives/Ripple.js'

export default {
  name: 'mdc-button',
  directives: { Ripple },
  props: {
    icon: String,
    trailingIcon: String,
    raised: Boolean,
    unelevated: Boolean,
    outlined: Boolean,
    dense: Boolean
  },
  computed: {
    classes() {
      return {
        'mdc-button--raised': this.raised,
        'mdc-button--unelevated': this.unelevated,
        'mdc-button--outlined': this.outlined,
        'mdc-button--dense': this.dense,
        'mdc-button__icon': this.icon,
        'mdc-button__only-icon rounded-full w-12 h-12 p-0 min-w-0': this.icon && !this.$slots['default']
      }
    }
  }
}
</script>

<style lang="scss">
@import "@material/button/mdc-button";
</style>
<style lang="stylus" scoped>
.mdc-button__only-icon .mdc-button__icon
  margin-right 0
  margin-left 0
</style>
