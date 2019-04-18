export default (number) => {
  let rounded = Math.round(number * 10) / 10
  if (String(rounded).length === 1) {
    rounded = rounded + '.0'
  }
  return rounded
}
