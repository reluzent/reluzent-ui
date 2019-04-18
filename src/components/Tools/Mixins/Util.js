export default {
  getFirstInput(elem) {
    if (elem.tagName === 'INPUT')
      return elem

    for (const child of elem.children) {
      const input = this.getFirstInput(child)
      if (input) return input
    }

    return null
  },
  getFirstTextarea(elem) {
    if (elem.tagName === 'TEXTAREA')
      return elem

    for (const child of elem.children) {
      const input = this.getFirstTextarea(child)
      if (input) return input
    }

    return null
  }
}
