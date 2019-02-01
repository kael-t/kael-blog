<template>
  <div class="sidebar-wrapper" :class="{'sidebar-wrapper--showing': !collapse || isShowing}">
    <button
      v-if="collapse"
      class="sidebar-collapse-btn"
      :class="{'sidebar-collapse-btn--showing': isShowing}"
      @click="isShowing = !isShowing"
    >{{tipText}}</button>
    <div class="sidebar-container">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  props: {
    // 可否展开
    collapse: {
      type: Boolean,
      default: true
    },
    // 默认展开
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShowing: this.show
    }
  },
  computed: {
    tipText () {
      return this.isShowing ? '收起' : '展开'
    }
  }
}
</script>
<style lang="less">
@import "~assets/styles/variable.less";
.sidebar-wrapper {
  position: relative;
  width: 0;
  transition: all .3s ease-out;
  overflow: hidden;
  &&--showing {
    width: 250px;
  }
}
.sidebar-collapse-btn {
  position: fixed;
  width: 70px;
  height: 40px;
  top: 71px;
  right: 0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  transition: right 0.3s ease-out;
  color: @theme-white;
  background-color: @theme-primary;
  border-color: @theme-primary;
  box-shadow: 3px 3px 10px #888888;
  z-index: 10000;
  &:hover {
    opacity: 0.8;
  }
  &&--showing {
    right: 250px;
  }
}
.sidebar-container {
  position: fixed;
  height: 100%;
  width: 100%;
  padding: 0 17px;
  overflow-y: auto;
  z-index: 10001;
  background: white;
}
</style>
