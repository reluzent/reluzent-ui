<template lang="pug">
  div.mdc-linear-progress.mdc-linear-progress--indeterminate(role="progressbar")
    div.mdc-linear-progress__buffering-dots
    div.mdc-linear-progress__buffer
    div.mdc-linear-progress__bar.mdc-linear-progress__primary-bar
      span.mdc-linear-progress__bar-inner
    div.mdc-linear-progress__bar.mdc-linear-progress__secondary-bar
      span.mdc-linear-progress__bar-inner
</template>
<style lang="scss">
@import "@material/linear-progress/mdc-linear-progress";
</style>
