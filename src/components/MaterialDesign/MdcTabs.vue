<template lang="pug">
  div.mdc-tabs
    .mdc-tab-bar(role='tablist')
      mdc-tab-scroller
        mdc-tab(
          v-for="(tab, i) in tabs"
          :key="i"
          :active="value === tab.id"
          :icon="tab.icon"
          :label="tab.name"
          @click.native="selectTab(tab)"
        )
    slot
</template>
<script>
import { MDCTabBar } from '@material/tab-bar'
import MdcTab from './MdcTab'
import MdcTabScroller from './MdcTabScroller'

export default {
  components: { MdcTab, MdcTabScroller },
  props: {
    tabs: Array,
    value: [String, Number]
  },
  methods: {
    selectTab(tab) {
      this.$emit('input', tab.id)
    }
  },
  mounted() {
    this.tabBar = new MDCTabBar(this.$el)
  }
}
</script>
<style lang="scss">
@import "@material/tab-bar/mdc-tab-bar";
</style>
