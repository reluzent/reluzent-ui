<template lang="pug">
  div.mdc-snackbar.z-10(aria-live="assertive" aria-atomic="true" aria-hidden="true" :class="{ 'mdc-snackbar--active': message }")
    div.mdc-snackbar__text {{ message }}
    div.mdc-snackbar__action-wrapper
      button.mdc-snackbar__action-button(
        type="button"
        v-for="button in buttons"
        :key="button.name"
        :class="button.class"
        @click="buttonClicked(button)"
      ) {{ button.name }}
</template>

<script>
function capitalizeFirstLetter(string) {
  string = String(string)
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default {
  data() {
    return {
      message: null,
      buttons: []
    }
  },
  methods: {
    buttonClicked(button) {
      this.message = null
      button.fn()
    }
  },
  mounted() {
    this.$onAll('SNACKBAR', (message, buttons) => {
      if (!message) return
      this.buttons = buttons
      this.message = capitalizeFirstLetter(message)
      setTimeout(() => {
        this.message = null
      }, buttons ? 6000 : 3500)
    })
  }
}
</script>
<style lang="stylus" scoped>
// Snackbar from top
.mdc-snackbar
  top 0
  bottom unset
  transform translate(0, -100%)
  min-height 5rem
  min-width  320px
.mdc-snackbar--active:not(.mdc-snackbar--align-start)
  transform translate3d(0, 0, 0) !important
  bottom unset
</style>

<style lang="scss">
@import "@material/snackbar/mdc-snackbar";
</style>
