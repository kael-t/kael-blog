<template>
  <div class="tag-list-wrapper">
    <ul class="tag-list">
      <li
        class="tag"
        :class="type && 'tag--' + type"
        v-for="(item, index) in tagList"
        :key="item.tagId"
        @click="selectTag(item, index)">
        <span>{{item.tagName}}</span>
        <sup class="tag-close-btn" v-if="closable && !selectable" @click="closeTag(index)">×</sup>
        <sup class="tag-select-btn" v-show="item.selected"><div class="hook"></div></sup>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: function () {
        return []
      }
    },
    selectable: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    },
    disableTransitions: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: '',
      validator: function (size) {
        return ['', 'primary', 'success', 'info', 'warning', 'danger'].indexOf(size) > -1
      }
    }
  },
  data () {
    return {
      tagList: this.value
    }
  },
  computed: {
    
  },
  methods: {
    closeTag (index) {
      this.tagList.splice(index, 1)
      this.$emit('input', this.tagList)
    },
    selectTag (item, index) {
      if (!this.selectable) {
        return
      }
      item.selected = !item.selected;
      this.$set(this.tagList, index, item)
      this.$emit('on-select', this.tagList.filter(tag => tag.selected))
    }
  }
}
</script>
<style lang="less">
@primary-tag: #409eff;
@success-tag: #67c23a;
@info-tag: #909399;
@warning-tag: #e6a23c;
@danger-tag: #f56c6c;

.tag-mixin (@color, @size: 20px) {
  @tag-border: lighten(@color, 20%);
  @tag-background: lighten(@color, 30%);
  color: @color;
  border: solid 1px @tag-border;
  background: @tag-background;
  &:before {
    .tag-arrow(@left: -11px, @tag-border)
  }
  &:after {
    .tag-arrow(@left: -10px, @tag-background)
  }
  &-select-btn,
  &-close-btn {
    position: absolute;
    top: -6px;
    right: -7px;
    height: 10px;
    width: 10px;
    border: solid 1px @tag-border;
    background: @tag-background;
    border-radius: 50%;
    line-height: 10px;
    text-align: center;
  }
  &-select-btn {
    background: #1aba1c;
    .hook {
      display: block;
      width: 7px;
      height: 5px;
      border-left: 1px solid white;
      border-bottom: 1px solid white;
      transform: rotate(-55deg);
    }
  }
}
.tag-arrow (@left, @border-color, @size: 10px) {
  content: '';
  position: absolute;
  top: 0;
  left: @left;
  display: inline-block;
  width: 0;
  border-bottom: solid 10px transparent;
  border-right: solid 10px @border-color;
  border-top: solid 10px transparent;
}
.tag-list-wrapper {
  padding: 10px 20px;
}
.tag {
  position: relative;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  padding: 0 5px;
  margin: 5px 10px;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  .tag-mixin(@primary-tag);
  &&--primary {
    .tag-mixin(@primary-tag);
  }
  &&--success {
    .tag-mixin(@success-tag);
  }
  &&--info {
    .tag-mixin(@info-tag);
  }
  &&--warning {
    .tag-mixin(@warning-tag);
  }
  &&--danger {
    .tag-mixin(@danger-tag);
  }
}
</style>
