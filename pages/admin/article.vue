<template>
  <div class="article-wrapper">
    <!-- <h4>发表文章</h4> -->
    <no-ssr>
      <mavon-editor
        class="editor"
        ref="mavonEditor"
        :toolbars="markdownOption"
        v-model="handbook"
        :placeholder="placeholder"
        :code-style="codeStyle"
        :ishljs="ishljs"
        @save="onSave">
      </mavon-editor>
    </no-ssr>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      markdownOption:{
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      placeholder: '写些东西向大家分享吧', // 提示文本
      codeStyle: 'monokai', // 主题
      ishljs: true,
      handbook:"#### 这是手册",
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs.mavonEditor.markdownIt)
    })
    console.log('app init, my quill insrance object is:', this.myQuillEditor)
    // setTimeout(() => {
    //   this.content = 'i am changed'
    // }, 3000)
  },
  methods: {
    onSave (markdown, HTMLText) {
      console.log('onsave', markdown, HTMLText)
    },
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.content = html
    }
  }
}
</script>
<style lang="less">
@import '~assets/styles/variable.less';
.article-wrapper {
  display: flex;
  height: 100%;
  flex-direction: column;
  .editor {
    flex: 1;
  }
}
#dark {
  .v-note-help-show,
  .auto-textarea-input,
  .v-note-show,
  .v-note-op,
  .v-note-edit,
  .popup-dropdown {
    background: var(--theme-white);
  }
  .v-show-content-html,
  .dropdown-item:hover,
  .op-icon:hover,
  .op-icon.selected,
  .v-show-content {
    background: darken(#4c4c4c, 5%)
  }
  .v-show-content-html,
  .v-note-help-show,
  .dropdown-item:hover,
  .op-icon:hover,
  .op-icon.selected,
  .v-show-content,
  .auto-textarea-input {
    color: var(--theme-black);
  }
  .markdown-body .highlight pre, .markdown-body pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: var(--border-color);
    color: var(--theme-black);
    border-radius: 3px;
  }
  .v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper {
    overflow-y: unset;
  }
}
</style>