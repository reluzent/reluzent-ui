<template lang="pug">
  .mdc-select.mdc-select--outlined(:class="classes")
    select.mdc-select__native-control(@input="ev => $emit('input', ev.target.value)" :value="value" :required="required")
      option(value='', disabled='', selected='')
      option(v-for="item in values" :key="item" :value="item" :selected="value === item" :disabled="disabled") {{ item }}
    label.mdc-floating-label(:class="{ 'mdc-floating-label--float-above bg-white z-1 px-2 ml-1': value }") {{ label }}
    .mdc-notched-outline
      svg
        path.mdc-notched-outline__path
    .mdc-notched-outline__idle
</template>

<script>
export default {
  props: {
    label: String,
    values: Array,
    value: [String, Number],
    required: Boolean,
    disabled: Boolean
  },
  computed: {
    classes() {
      return {
        'mdc-select--disabled': this.disabled
      }
    }
  }
}
</script>

<style lang="scss">
@import "@material/select/mdc-select";
</style>
