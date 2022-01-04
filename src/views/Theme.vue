<template>
  <el-container id="theme">
    <el-header>
      <div>
        <span>Blog 后台管理</span>
      </div>
      <div>
        <el-button type="info">退出</el-button>
      </div>
    </el-header>

    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
<!--        <div class="toggle-button" @click="toggleCollapse">|||</div>-->
        <el-menu
            :router="true"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            unique-opened
            :collapse="isCollapse"
            :default-active="$route.path">
          <el-submenu :index="menu.id+''" v-for="menu in menus" :key="menu.id">
            <template #title>
              <span>{{ menu.name }}</span>
            </template>
            <el-menu-item :index="'/' + subMenu.path" v-for="subMenu in menu.subMenus" :key="subMenu.id">
              <template #title>
                <i class="el-icon-menu"></i>
                <span>{{ subMenu.name }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {apiMenus} from "@/request/api/menu";

export default {
  name: "Theme",
  data() {
    return {
      isCollapse: false,
      menus: [],
    }
  },
  methods: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  mounted() {
    apiMenus().then(response => {
      this.menus = response.data;
    })
  }
}
</script>

<style lang="stylus">

#theme
  min-height 100vh

.el-header
  background-color #373d41
  color #ffffff
  align-items center
  font-size 20px
  line-height 25px
  display flex
  justify-content: space-between

.el-aside {
  background-color: #333744;

}




.toggle-button
  background-color #4a5064
  font-size 10px
  line-height 24px
  color #ffffff
  text-align center
  letter-spacing 0.2em
  cursor pointer

</style>