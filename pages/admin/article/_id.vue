<template>
  <div class="article-wrapper">
    <div class="article-title-wrapper">
      <el-input placeholder="输入文章标题" v-model="article.title"></el-input>
    </div>
    <tag-list
      v-model="tags"
      :selectable="true"
      :can-add="true"
      @on-select="tagSelect"
      @on-add-tag="handleAddTag"
    ></tag-list>
    <no-ssr>
      <mavon-editor
        class="editor"
        ref="mavonEditor"
        :toolbars="markdownOption"
        v-model="article.content"
        :placeholder="placeholder"
        :code-style="codeStyle"
        :ishljs="ishljs"
        @save="saveArticle">
      </mavon-editor>
    </no-ssr>
    <div class="article-toobar">
      <el-switch
        style="margin: 0 20px"
        v-model="article.status"
        active-color="#13ce66"
        active-text="发布文章"
        :active-value="status['PUBLISH']"
        inactive-color="#409eff"
        inactive-text="存为草稿"
        :inactive-value="status['DRAFT']">
      </el-switch>
      <el-button icon="el-icon-upload" size="medium" type="primary" :loading="articleUploading" @click="saveArticle">保存</el-button>
    </div>
  </div>
</template>

<script>
import TagList from '~/components/TagList'
import { deepClone } from '~/utils/common.utils'
export default {
  layout: 'admin',
  components: {
    TagList
  },
  async fetch ({ store }) {
    if (!store.state.tag.list.length) {
      await store.dispatch('tag/GET_TAG_LIST')
    }
  },
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
      article: {
        title: '',
        content: '',
        tagIds: '',
        stauts: 0
      },

      articleUploading: false,
      status: {
        DRAFT: 0,
        PUBLISH: 1
      },

      // tags: [{tagId: 1, tagName: 'node'}, {tagId: 2, tagName: 'javascript'}]
    }
  },
  computed: {
    tags () {
      return deepClone(this.$store.state.tag.list)
    }
  },
  mounted() {
    if (this.$route.params.id) {
      let id = this.$route.params.id
      this.$store.dispatch('article/GET_ARTICLE_DETAIL', {articleId: id}).then((data) => {
        this.article = data.data
      })
    }
  },
  methods: {
    saveArticle () {
      if (this.articleUploading) {
        return
      }
      let id = this.$route.params.id
      let { content, title, status, tagIds } = this.article
      let params = { content, title, status, tagIds, articleId: id }
      this.articleUploading = true
      this.$store.dispatch('article/SAVE_ARTICLE', params).then(data => {
        this.articleUploading = false
        if (data.code === 0) {
          this.$message.success(data.msg)
        }
      }).catch(err => {
        this.articleUploading = false
      })
    },
    tagSelect (tags) {
      this.article.tagIds = tags.map(tag => {
        return tag.tagId
      }).join(',')
    },
    updateTags () {
      this.$store.dispatch('tag/GET_TAG_LIST')
    },
    handleAddTag (label) {
      if (label) {
        this.$store.dispatch('tag/CREATE_TAG', {label: label}).then(data => {
          if (data.code === 0) {
            this.$message.success('新增标签成功')
            this.tags.push(data.tag)
          } else {
            this.$message.error(data.msg)
          }
        })
      }
      this.label = '';
    }
  }
}
</script>
<style lang="less" scoped>
@import '~assets/styles/variable.less';
.article-wrapper {
  // display: flex;
  height: 100%;
  flex-direction: column;
  .editor {
    height: 80%;
  }
  .article-toobar {
    margin-top: 20px;
    text-align: right;
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