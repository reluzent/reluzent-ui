<template lang="pug">
  .mdc-tab-scroller
    .mdc-tab-scroller__scroll-area
      .mdc-tab-scroller__scroll-content.mb-2
        slot
</template>
<script>
import { MDCTabScroller } from '@material/tab-scroller'

export default {
  props: ['icon', 'label'],
  mounted() {
    this.tabScroller = new MDCTabScroller(this.$el)
  }
}
</script>
<style lang="scss">
@import "@material/tab-scroller/mdc-tab-scroller";
</style>
