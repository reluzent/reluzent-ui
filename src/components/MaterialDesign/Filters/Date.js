const addZero = (n) => {
  return n < 10 ? `0${n}` : n
}

export default (value) => {
  const d = new Date(value)

  return `${addZero(d.getDate())}/${addZero(d.getMonth() + 1)}/${addZero(d.getFullYear())}`
}
