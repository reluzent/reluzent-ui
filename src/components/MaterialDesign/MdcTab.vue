<template lang="pug">
  button.mdc-tab.mdc-tab--active.px-2(role='tab', aria-selected='true', tabindex='0')
    span.mdc-tab__content
      span.mdc-tab__icon.material-icons(v-if="icon" aria-hidden='true') {{ icon }}
      span.mdc-tab__text-label {{ label }}
    span.mdc-tab-indicator(:class="{ 'mdc-tab-indicator--active': active }")
      span.mdc-tab-indicator__content.mdc-tab-indicator__content--underline
    span.mdc-tab__ripple
</template>
<script>
import { MDCTab } from '@material/tab'
import { MDCTabIndicator } from '@material/tab-indicator'

export default {
  props: ['icon', 'label', 'active'],
  mounted() {
    this.tab = new MDCTab(this.$el)
    this.tabIndicator = new MDCTabIndicator(this.$el.children[1])
  }
}
</script>
<style lang="scss">
@import "@material/tab-indicator/mdc-tab-indicator";
@import "@material/tab/mdc-tab";
</style>
<style lang="stylus" scoped>
@media only screen and (max-width: 380px)
  .mdc-tab__text-label
    font-size 10px
</style>
