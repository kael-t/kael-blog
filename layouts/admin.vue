<template>
  <el-container class="g-container">
    <div class="admin-nav">
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group> -->
      <el-menu router :default-active="$route.path" class="admin-nav-menu" :collapse="isCollapse">
        <el-tooltip class="item" effect="dark" content="展开" placement="right" :disabled="!isCollapse">
          <div class="collapse-btn" @click="isCollapse = !isCollapse">
            <i class="el-icon-menu" :class="{'rotate-180': !isCollapse}"></i>
            <span v-if="!isCollapse">收起</span>
          </div>
        </el-tooltip>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">博客相关</span>
          </template>
          <el-menu-item index="/admin/bloggerInfo">
            <i class="el-icon-info"></i>
            <span slot="title">侧边栏信息</span>
          </el-menu-item>
          <el-menu-item index="/admin/userManagement">
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/admin/article">
          <i class="el-icon-document"></i>
          <span slot="title">文章</span>
        </el-menu-item>
        <el-menu-item index="/">
          <i class="el-icon-setting"></i>
          <span slot="title">回到用户侧</span>
        </el-menu-item>
      </el-menu>
    </div>
    <el-main class="admin-main">
      <nuxt />
    </el-main>
  </el-container>
  <!-- <div class="g-container">
    
    <div>
      <nuxt />
    </div>
  </div> -->
</template>

<script>
import LoginFlowBtn from '~/components/LoginFlowBtn'
import ThemeMixin from '~/mixins/themeMixin'
export default {
  layout: 'admin',
  middleware: 'auth',
  mixins: [ThemeMixin],
  data () {
    return {
      isCollapse: true
    }
  }
}
</script>
<style lang="less">
@import '~assets/styles/variable.less';
.admin-main {
  position: relative;
  background: @theme-white;
  color: @theme-black;
}
.el-tooltip {
  outline: none;
}
.admin-nav {
  height: 100%;
  &-menu {
    height: 100%;
    border-color: @border-color;
    overflow: auto;
    .collapse-btn {
      height: 64px;
      line-height: 64px;
      // padding-left: 20px;
      text-align: center;
      i {
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
      }
      span {
        font-size: 14px;
      }
      &:hover {
        cursor: pointer;
        background-color: #ecf5ff;
      }
    }
    &:not(.el-menu--collapse) {
      width: 300px;
    }
  }
}
</style>
