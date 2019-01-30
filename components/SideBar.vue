<template>
  <div class="sidebar-wrapper" :class="{'sidebar-wrapper--showing': !collapse || isShowing}">
    <button
      v-if="collapse"
      class="sidebar-collapse-btn"
      :class="{'sidebar-collapse-btn--showing': isShowing}"
      @click="isShowing = !isShowing"
    >展开</button>
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
  
}
</script>
<style lang="less">
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
  top: 10px;
  right: 10px;
  transition: all .3s ease-out;
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
}
</style>
