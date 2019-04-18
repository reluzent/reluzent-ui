<template lang="pug">
  button.mdc-fab(aria-label="Favorite" v-ripple)
    span.mdc-fab__icon.material-icons
      slot
</template>
<script>
import Ripple from './Directives/Ripple.js'
export default {
  directives: { Ripple }
}
</script>

<style lang="scss">
@import "@material/fab/mdc-fab";
</style>
