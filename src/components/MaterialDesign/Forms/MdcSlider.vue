<template lang="pug">
  div.mdc-form-field
    // Leading Icon
    i.material-icons.mdc-text-field__icon(tabindex="0" role="button" v-if="leadingIcon") {{ leadingIcon }}
    // Slider
    .mdc-slider(:class="classes", tabindex='0', role='slider'
      :data-step="dataStep",
      :aria-valuemin='min',
      :aria-valuemax='max',
      :aria-valuenow='value',
      :aria-disabled="disabled",
      aria-label='Select Value'
    )
      .mdc-slider__track-container
        .mdc-slider__track
        .mdc-slider__track-marker-container(v-if="markers")
      .mdc-slider__thumb-container
        .mdc-slider__pin(v-if="discrete || markers")
          span.mdc-slider__pin-value-marker
        svg.mdc-slider__thumb(width='21', height='21')
          circle(cx='10.5', cy='10.5', r='7.875')
        .mdc-slider__focus-ring
    // Value
    span.value(v-if="!hideValue") {{ result || value }}
</template>
<script>
import { MDCSlider } from '@material/slider'

export default {
  props: {
    // Options
    min: { type: [Number, String], default: 0 },
    max: [Number, String],
    dataStep: String,
    // Visual
    label: String,
    leadingIcon: String,
    result: String,
    // V-model
    value: [Number, String],

    // Classes
    disabled: Boolean,
    discrete: Boolean,
    markers: Boolean,
    hideValue: Boolean
  },
  computed: {
    classes() {
      return {
        'mdc-slider--discrete': this.discrete || this.markers,
        'mdc-slider--display-markers': this.markers
      }
    }
  },
  watch: {
    value(newVal) {
      if (newVal)
        this.slider.value = newVal
    }
  },
  mounted() {
    this.slider = new MDCSlider(this.$el.querySelector('.mdc-slider'))
    this.slider.value = this.value
    this.slider.listen('MDCSlider:change', () => this.$emit('input', this.slider.value))
  }
}
</script>
<style lang="scss">
@import "@material/slider/mdc-slider";
@import "@material/form-field/mdc-form-field";
</style>
<style lang="scss" scoped>
.mdc-form-field {
  width: 100%;
  .value, .material-icons {
    min-width: 80px;
  }
}
</style>
