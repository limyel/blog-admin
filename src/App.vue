<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus" scoped>
@import "https://unpkg.com/element-ui/lib/theme-chalk/index.css"
@import "./assets/css/reset.css"
@import "./assets/css/iamui-ui.min.css"

#app
  height 100%

</style>
