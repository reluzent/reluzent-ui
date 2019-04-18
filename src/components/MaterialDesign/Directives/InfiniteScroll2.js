// working just for window object
// To do: Control scroll for any element

const tolerance = 10

// On scroll handler
function onScroll(evt, forceChange) {
  if (this.$lastY - tolerance < document.documentElement.scrollTop || forceChange) {
    const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight

    if (bottomOfWindow || forceChange) {
      onFetch(this)
    }
    this.$lastY = document.documentElement.scrollTop
  }
}

// Get Element by arg or directive $el
function getElem(el, binding) {
  if (binding.arg === 'window') return window

  return binding.arg ? document.querySelector(binding.arg) : el
}

// Fetch handler
function onFetch(value) {
  if (value.$isLoading) return

  value.$isLoading = true
  value.fetch()
    .then(items => {
      if (items.length > 0) {
        const newItems = [...value.items, ...items]
        if (value.onInput)
          value.onInput(newItems)
        else
          value.items = newItems

        if (value.isLastId)
          value.last_id = newItems[newItems.length - 1]._id
        else
          value.page = value.page + 1
      }
    })
    .catch(err => {
      if (value.onError)
        value.onError(err)
    })
    .then(() => {
      value.$isLoading = false
      if (value.onFinally)
        value.onFinally()
    })
}

export default {
  inserted(el, binding, vnode) {
    // Set a private scroll function
    vnode.context.$onScroll = onScroll.bind(vnode.context)
    vnode.context.$lastY = 0
    vnode.context.$forceInfiniteScrollChange = () => vnode.context.$onScroll(null, true)

    // Do the first fetch
    onFetch(vnode.context)

    // Add event listener
    getElem(el, binding).addEventListener('scroll', vnode.context.$onScroll)
  },
  unbind(el, binding, vnode) {
    getElem(el, binding).removeEventListener('scroll', vnode.context.$onScroll)
  }
}
