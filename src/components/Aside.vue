<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '200px'">
      <div class="toggle-button" @click="toggleCollapse">|||</div>

    </el-aside>
  </el-container>
</template>

<script>
export default {
  name: "Aside"
}
</script>

<style scoped>

</style>