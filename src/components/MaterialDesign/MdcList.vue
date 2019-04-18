<template lang="pug">
  ul.mdc-list(:class="classes")
    h6.mdc-typography--subtitle1 {{ title }}
    slot
</template>

<script>
export default {
  props: {
    avatar: Boolean,
    dense: Boolean,
    twoLine: Boolean,
    nonInteractive: Boolean,
    title: String
  },
  computed: {
    classes () {
      return {
        'mdc-list--dense': this.dense,
        'mdc-list--two-line': this.twoLine,
        'mdc-list--avatar-list': this.avatar,
        'mdc-list--non-interactive': this.nonInteractive
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .mdc-list
    padding 5px 0
    text-align left
    h6.mdc-typography--subtitle1
      margin 10px 16px
      text-transform capitalize
</style>
<style lang="scss">
@import "@material/list/mdc-list";
</style>
