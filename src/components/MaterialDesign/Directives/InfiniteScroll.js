// working just for window object
// To do: Control scroll for any element

// On scroll handler
function onScroll() {
  const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight

  if (bottomOfWindow) {
    this.value()
  }
  this.$lastY = document.documentElement.scrollTop
}

// Get Element by arg or directive $el
function getElem(el, binding) {
  if (binding.arg === 'window') return window

  return binding.arg ? document.querySelector(binding.arg) : el
}

export default {
  inserted(el, binding, vnode) {
    // Set a private scroll function
    vnode.context.$onScroll = onScroll.bind(binding)

    // Do the first fetch
    binding.value()

    // Add event listener
    getElem(el, binding).addEventListener('scroll', vnode.context.$onScroll)
  },
  unbind(el, binding, vnode) {
    getElem(el, binding).removeEventListener('scroll', vnode.context.$onScroll)
  }
}
