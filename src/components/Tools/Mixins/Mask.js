
import format from 'v-mask/src/format'

export default {
  props: {
    mask: String
  },
  watch: {
    value(val) {
      if (this.mask && val) {
        this.$emit('input', format(val, this.mask))
      }
    }
  },
  computed: {
    minMask() {
      return this.mask ? this.mask.replace(/\?./g, '').length : null
    },
    maxMask() {
      return this.mask ? this.mask.length : null
    }
  }
}
