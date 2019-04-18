<template lang="pug">
  mdc-card(:actions="actions" :actionsIcons="actionsIcons" @onAction="val => $emit('onAction', val)")
    // header
    div.mdc-card__media(name="header" :class="classes" :style="style")
      div.mdc-card__media-content {{ mediaText }}
    // body
    slot
</template>

<script>
import MdcCard from './MdcCard'

export default {
  name: 'mdc-card-media',
  components: { MdcCard },
  props: {
    square: {
      type: Boolean,
      default: true
    },
    img: {
      type: String,
      default: ''
    },
    mediaText: {
      type: String,
      default: ''
    },
    actions: {
      type: Array,
      default: null
    },
    actionsIcons: {
      type: Array,
      default: null
    }
  },
  computed: {
    style() {
      return {
        backgroundImage: this.img ? `url(${this.img})` : null
      }
    },
    classes() {
      return {
        'mdc-card__media--square': this.square
      }
    }
  }
}
</script>
