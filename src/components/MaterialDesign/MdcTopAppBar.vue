<template lang="pug">
  div.mdc-top-app-bar
    div.mdc-top-app-bar__row
      // Menu options
      section.mdc-top-app-bar__section.mdc-top-app-bar__section--align-start
        slot
          a(href="#" v-if="menu" @click="$emit('menu')").material-icons.mdc-top-app-bar__navigation-icon menu
          span.mdc-top-app-bar__title(v-if="title") {{ title }}
</template>

<script>
export default {
  name: 'mdc-top-app-bar',
  props: {
    title: String,
    menu: Boolean
  }
}
</script>
<style lang="scss">
@import "@material/top-app-bar/mdc-top-app-bar";
</style>
