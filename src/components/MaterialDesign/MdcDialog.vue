<template lang="pug">
  .mdc-dialog(:class="classes" role='alertdialog', aria-modal='true', aria-labelledby='my-dialog-title', aria-describedby='my-dialog-content')
    .mdc-dialog__container
      .mdc-dialog__surface
        // Title cannot contain leading whitespace due to mdc-typography-baseline-top()
        h2.mdc-dialog__title#my-dialog-title
          | {{ title }}

        .mdc-dialog__content#my-dialog-content
          slot
        footer.mdc-dialog__actions
          slot(name="buttons")
            button.mdc-button.mdc-dialog__button(type='button', :data-mdc-dialog-action='action', v-for="action in actions", @click="actionClick(action)")
              span.mdc-button__label {{ action }}
    .mdc-dialog__scrim
</template>
<script>
export default {
  props: {
    title: String,

    // v-model
    value: [Boolean, String],

    // ['Confirmar', 'Cancelar']
    actions: {
      type: Array,
      default: () => ['OK']
    }
  },
  computed: {
    classes() {
      return {
        'mdc-dialog--open': this.value
      }
    }
  },
  methods: {
    actionClick(name) {
      if (name === 'OK') {
        this.$emit('input', false)
      }
      // O nome do evento é o nome do botão
      this.$emit(name)
    }
  }
}
</script>

<style lang="scss">
@import "@material/dialog/mdc-dialog";
</style>
