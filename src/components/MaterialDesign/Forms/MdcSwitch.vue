<template lang="pug">
.mdc-form-field
  .mdc-switch(:class="classes")
    .mdc-switch__track
    .mdc-switch__thumb-underlay
      .mdc-switch__thumb
        input.mdc-switch__native-control(:id="uniqueId", :value="value", @input="input", type='checkbox', role='switch')
  label(:for='uniqueId')
    slot
</template>
<script>
import UniqueId from '../../Tools/Mixins/UniqueId.js'

export default {
  mixins: [UniqueId],
  props: {
    value: Boolean
  },
  computed: {
    classes() {
      return {
        'mdc-switch--disabled': this.disabled,
        'mdc-switch--checked': this.value
      }
    }
  },
  methods: {
    input(ev) {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss">
@import "@material/switch/mdc-switch";
@import "@material/form-field/mdc-form-field";
</style>
