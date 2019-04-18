
// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  globals: {
    workbox: true,
    importScripts: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    '@vue/eslint-config-standard',
    'plugin:vue/essential',
    '@vue/standard'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,

    'no-unused-vars': 1,
    'space-before-function-paren': 0,
    'one-var': 0,
    'curly': 0,
    'no-multi-spaces': 0,
    'key-spacing': 0,
    'standard/no-callback-literal': 0,

    // ES6
    'object-shorthand': 0,
    'prefer-arrow-callback': 0,
    'prefer-const': 2,
    'quotes': ['error', 'single'],
    'prefer-spread': 2,
    'require-await': 2,
    'prefer-rest-params': 1,

    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
