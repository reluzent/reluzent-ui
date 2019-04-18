<template lang="pug">
  .infinite-scroll
    slot
</template>
<script>
// working just for window object

// TODO: Try to not make a request everything scroll if got the last document

export default {
  props: {
    watch: {
      type: String,
      default: 'window'
    },
    url: {
      type: String
    },
    isLastId: {
      type: Boolean
    },
    value: {
      type: Array
    }
  },
  data() {
    return {
      last_id: null,
      page: 0,
      lastUrl: null
    }
  },
  methods: {
    onScroll() {
      const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight

      if (bottomOfWindow) {
        this.fetch()
      }
      this.$lastY = document.documentElement.scrollTop
    },
    fetch(isLastId = this.isLastId) {
      if (!this.url) return
      let queryString = 'limit=10'

      // Infinite Scroll can paginate by Page or Last_id
      if (isLastId && this.last_id)
        queryString += `&last_id=${this.last_id}`
      else if (!isLastId)
        queryString += `&page=${this.page}`

      this.$emitAll('LOADING', true)

      const url = this.url.indexOf('?') > -1 ? `${this.url}&${queryString}` : `${this.url}?${queryString}`

      if (this.lastUrl === url) {
        this.$emitAll('LOADING', false)
        return
      }

      this.lastUrl = url

      this.$api.get(url)
        .then(items => {
          if (items && items.length > 0) {
            const newItems = [...this.value, ...items]
            this.$emit('input', newItems)

            this.last_id = newItems[newItems.length - 1]._id
            this.page = this.page + 1
          } else if (this.last_id === null) {
            this.$emit('haveItems', false)
          }
        })
        .catch(err => {
          this.$emitAll('SNACKBAR', err.clientMessage)
        })
        .then(() => this.$emitAll('LOADING', false))
    }
  },
  watch: {
    url(val) {
      this.page = 0
      this.last_id = null
      this.$emit('input', [])
      this.fetch()
    }
  },
  mounted() {
    this.elem = this.watch === 'window' ? window : this.$el

    this.fetch()

    this.elem.addEventListener('scroll', this.onScroll)
  },
  deactivated() {
    this.elem.removeEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    this.elem.removeEventListener('scroll', this.onScroll)
  }
}
</script>
