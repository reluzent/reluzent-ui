import Util from '../Mixins/Util'

/**
 * Always reverse logic
 * Return a error message if is not valid
 */
const _validators = {
  required: val => {
    if (!(val !== null && val !== undefined && val !== '')) return 'Campo obrigatório'
  },
  min: (val, param) => {
    const count = val ? val.length || val : 0
    if (count < Number(param)) return `Mínimo ${param} caracteres`
  },
  max: (val, param) => {
    const count = val ? val.length || val : 0
    if (count > Number(param)) return `Máximo ${param} caracteres`
  },
  regex: (val, param) => {
    // Result: /[a-zA-Z]/g => ['[a-zA-Z]', 'g']
    const regex = param.replace('/', '').split('/')
    if (!new RegExp(regex[0], regex[1]).test(val)) return 'Campo inválido'
  },
  email: (val) => {
    if (!/([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/.test(val)) return 'Email inválido'// eslint-disable-line
  }
}

function validate(value, validators) {
  let firstError

  for (const name in validators) {
    const validator = _validators[name]

    firstError = validator ? validator(value, validators[name]) : null

    if (firstError) break
  }

  return firstError
}

/**
 * How to use:
 *   valid="require|min:6"
 */
export default {
  props: {
    valid: String
  },
  data() {
    return {
      invalidValid: false,
      errorMessage: '',
      validators: null,
      minValid: null,
      maxValid: null
    }
  },
  computed: {
    validComputed() {
      if (!this.$el.getAttribute('name'))
        this.$el.setAttribute('name', +new Date())

      this.buildvalidators()

      return this.valid
    },
    requiredValid() {
      if (this.validators) {
        return this.validators['required']
      }
    }
  },
  watch: {
    value(val) {
      if (this.validComputed) {
        const error = validate(val, this.validators)

        this.$parent.$error[this.$el.getAttribute('name')] = error
        this.errorMessage = error

        if (this.$inputElem.setCustomValidity)
          this.$inputElem.setCustomValidity(error || '')

        this.$nextTick(() => {
          this.invalidValid = !!error
        })
      }
    }
  },
  methods: {
    buildvalidators() {
      if (this.valid && !this.validators) {
        this.validators =  {}

        this.valid.split('|').map(valid => {
          this.validators[valid.split(':')[0]] = valid.split(':')[1] || true
        })

        this.$inputElem = Util.getFirstInput(this.$el)

        this.minValid = this.validators['min']
        this.maxValid = this.validators['max']
      }
    }
  },
  mounted() {
    this.buildvalidators()
  }
}
