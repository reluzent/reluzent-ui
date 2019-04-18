<template lang="pug">
  .mdc-radio-group
    .mdc-form-field(v-for="(item, index) in values" :key="index" v-if="values && values.length > 0")
      .mdc-radio(:class="{ 'mdc-radio--disabled': disabled }")
        input.mdc-radio__native-control(type="radio", :name="uniqueId", :checked="isChecked(item, index)", :disabled="disabled", :id="index", @input="$emit('input', item)")
        .mdc-radio__background
          .mdc-radio__outer-circle
          .mdc-radio__inner-circle
      label.capitalize(:for="index" v-once) {{ item }}
</template>

<script>
import UniqueId from '../../Tools/Mixins/UniqueId.js'

export default {
  mixins: [UniqueId],
  props: {
    values: Array,
    disabled: Boolean,
    // v-model
    value: [String, Number]
  },
  methods: {
    isChecked(value, index) {
      if (this.value)
        return this.value === value
      return index === this.values[0]
    }
  }
}
</script>
<style lang="scss">
@import "@material/radio/mdc-radio";
@import "@material/form-field/mdc-form-field";
</style>
