<template lang="pug">
  div
    .backdrop(v-if="value" @click="$emit('input', false)")
    aside.mdc-drawer.mdc-drawer--modal(:class="{ 'open': value }")
      header.mdc-drawer__header
        slot(name="header")
      nav.mdc-drawer__content
        slot(name="content")
</template>

<script>
export default {
  props: {
    value: Boolean
  }
}
</script>
<style lang="stylus">
.backdrop
  background-color rgba(0, 0, 0, 0.32)
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  transition-property opacity
  transition-timing-function cubic-bezier(0.4, 0, 0.2, 1)
  z-index 5
.mdc-drawer, .mdc-drawer--modal
  transition transform 300ms 0ms cubic-bezier(0.4, 0, 0.2, 1) !important
  transform translate3d(-100%, 0, 0)
  display   flex !important
  top 0
.mdc-drawer--modal.open
  transform translate3d(0, 0, 0)
</style>
<style lang="scss">
@import "@material/drawer/mdc-drawer";
</style>
