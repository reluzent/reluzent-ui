<template lang="pug">
  div.mdc-card(:class="{ 'shaped-card': shaped }")
    // Header
    slot(name="header")

    // Content
    div.mdc-card__primary-action(:class="classPrimary")
      slot

    // Actions
    div.mdc-card__actions(v-if="actions || actionsIcons || $slots.actions")
      slot(name="actions")
        div.mdc-card__action-buttons
          mdc-button.mdc-card__action.mdc-card__action--button(
            v-for="action in actions" :key="action"
            @click="onAction(action)"
          ) {{ action }}
        div.mdc-card__action-icons
          i.material-icons.mdc-icon-button.mdc-card__action.mdc-card__action--icon(
            v-for="(action, index) in actionsIcons" :key="index"
            :style="{ color: action.color }"
            @click.stop.prevent="onAction(action, index)"
          ) {{ action.name || action }}

</template>

<script>
import MdcButton from './MdcButton'

export default {
  components: { MdcButton },
  props: {
    actions: {
      type: Array,
      default: null
    },
    actionsIcons: {
      type: Array,
      default: null
    },
    classPrimary: {
      type: String
    },
    shaped: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onAction(action, index) {
      this.$emit('onAction', { action, index })
    }
  }
}
</script>
<style lang="scss">
@import "@material/card/mdc-card";

.mdc-card___primary {
  justify-content: flex-start;
  text-align: left;
}
.mdc-card__primary-action {
  padding: 1rem;
  justify-content: flex-start;
  text-align: left;
  flex-grow: 1;
}
</style>
<style lang="stylus" scoped>
.shaped-card
  text-align left
  border-radius 24px 8px
  .mdc-card___primary
    h2, h3
      margin 0
      text-transform capitalize
  >>> .mdc-card__actions
    .mdc-card__action-icons
      .mdc-icon-button
        padding 0 10px 0 0
</style>
