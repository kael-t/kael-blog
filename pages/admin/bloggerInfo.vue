<template>
  <div class="blog-info-wrapper">
    <h4 class="form-title">侧边栏信息</h4>
    <el-form :model="blogger" label-width="100px">
      <el-form-item label="博主" prop="name">
        <el-input v-model="blogger.name"></el-input>
      </el-form-item>
      <el-form-item label="我的箴言" prop="motto">
        <el-input v-model="blogger.motto"></el-input>
      </el-form-item>
      <el-form-item label="我的QQ" prop="qq">
        <el-input type="email" v-model="blogger.qq"></el-input>
      </el-form-item>
      <el-form-item label="我的微博" prop="weibo">
        <el-input type="url" v-model="blogger.weibo"></el-input>
      </el-form-item>
      <el-form-item label="我的github" prop="github">
        <el-input type="url" v-model="blogger.github"></el-input>
      </el-form-item>
      <el-form-item label="关于我" prop="type">
        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" placeholder="写写关于我的资料" v-model="blogger.aboutMe">></el-input>
      </el-form-item>
      <div class="btn-bar">
        <el-button type="primary" @click="submitForm()" :loading="submitLoading">提&emsp;交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  // fetch({ store, params }) {
  //   return store.dispatch('blogger/GET_BLOGGER_INFO')
  // },
  data () {
    return {
      blogger: {
        name: '',
        motto: '',
        qq: '',
        weibo: '',
        github: '',
        aboutMe: ''
      },
      submitLoading: false
    }
  },
  computed: {
    aboutMeText () {
      return this.text2html(this.blogger.aboutMe)
    }
  },
  created () {
    this.$store.dispatch('blogger/GET_BLOGGER_INFO').then(res => {
      if (res.code === 0) {
        let data = res.bloggerInfo
        data.aboutMe = this.html2text(data.aboutMe)
        this.blogger = data
      }
    })
  },
  methods: {
    submitForm () {
      let params = {...this.blogger};
      params.aboutMe = this.aboutMeText;
      this.submitLoading = true;
      this.$store.dispatch('blogger/SET_BLOGGER_INFO', params).then(data => {
        this.submitLoading = false;
        if (data.code === 0) {
          this.$message.success('侧边栏修改好了')
        }
      }).catch(err => {
        this.submitLoading = false;
        this.$message.error('没修改成功，咋回事呢？o(╥﹏╥)o')
      })
    },
    html2text (str) {
      const reg = /\<br\>/g
      // 把<br>标签重新替换为/n
      return str.replace(reg, '\n')
    },
    text2html (str) {
      const reg = /\n/g
      // 把\n替换为<br>
      return str.replace(reg, '<br>')
    }
  }
}
</script>
<style lang="less">
@import "~assets/styles/variable.less";
.blog-info-wrapper {
  position: absolute;
  width: 500px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .form-title {
    color: @theme-primary;
    text-align: center;
    margin-bottom: 40px;
  }
}
</style>
