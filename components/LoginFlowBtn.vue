<template>
  <div>
    <!-- 悬浮按钮 -->
    <div class="float-ele float-btn" :class="{close: navBtnToggleFlag}" @click="navBtnToggle()">
      <span class="btn-line"></span>
      <span class="btn-line"></span>
      <span class="btn-line"></span>
    </div>
    <!-- 悬浮导航栏 -->
    <transition name="fade-top" mode="in-out">
      <div class="float-ele float-menu" v-show="navBtnToggleFlag">
        <ul>
          <template v-if="isLogin">
            <li @click="toggleTheme()"><i class="iconfont icon-signout"></i>切换主题</li>
            <li @click="signout()"><i class="iconfont icon-signout"></i>退出登录</li>
          </template>
          <template v-if="!isLogin">
            <li @click="signin()"><i class="iconfont icon-signin"></i>登录</li>
            <li @click="signup()"><i class="iconfont icon-signup"></i>注册</li>
          </template>
        </ul>
      </div>
    </transition>
    <!-- 登录弹框 -->
    <el-dialog
      title="登录"
      :visible.sync="showLoginModal"
      width="25%"
      @closed="modalClosed('loginForm')"
      center>
      <el-form :model="loginForm" status-icon :rules="loginFormRules" ref="loginForm" label-width="100px" class="loginForm">
        <el-form-item label="账号" prop="account">
          <el-input type="email" v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :error="passwardError">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-bar">
        <el-button type="primary" @click="loginConfirm()" :loading="submitLoading">登&emsp;录</el-button>
      </div>
    </el-dialog>
    <!-- 注册弹框 -->
    <el-dialog
      title="注册"
      :visible.sync="showRegisterModal"
      width="25%"
      @closed="modalClosed('registerForm')"
      center>
      <el-form :model="registerForm" status-icon :rules="registerFormRules" ref="registerForm" label-width="100px" class="registerForm">
        <el-form-item label="账号" prop="account">
          <el-input type="email" v-model="registerForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input type="nickname" v-model="registerForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="registerForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="registerForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registerConfirm()" :loading="submitLoading">确 定</el-button>
          <el-button @click="showRegisterModal = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ThemeMixin from '~/mixins/themeMixin'
export default {
  mixins: [ThemeMixin],
  data () {
    const validateCheckAccount = (rule, value, callback) => {
      this.$store.dispatch('user/CHECK_ACCOUNT', {account: value}).then(res => {
        if (res.code === 0) {
          callback();
        } else {
          callback(new Error(res.msg));
        }
      })
    }

    const validateCheckPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      navBtnToggleFlag: false,

      submitLoading: false,

      loginForm: {
        account: null,
        password: null,
      },
      registerForm: {
        account: null,
        password: null,
        checkPassword: null,
        nickname: null,
        email: null
      },
      loginFormRules: {
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 8, max: 16, message: `长度在 8 到 16 个字符`, trigger: 'blur' }
        ]
      },
      registerFormRules: {
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { validator: validateCheckAccount, trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入email', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 8, max: 16, message: `长度在 8 到 16 个字符`, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 8, max: 16, message: `长度在 8 到 16 个字符`, trigger: 'blur' },
          { validator: validateCheckPassword, trigger: 'blur' }
        ]
      },
      showRegisterModal: false,
      showLoginModal: false,

      passwardError: ''
    }
  },
  computed: {
    ...mapState('user', [
      'isLogin',
      'user'
    ]),
    backgroundColor () {
      return this.$route.path.indexOf('/articleDetail') > -1 ? 'white' : '';
    }
  },
  methods: {
    // 导航按钮点击事件
    navBtnToggle () {
      this.navBtnToggleFlag = !this.navBtnToggleFlag;
    },
    // 注册
    signup () {
      this.showRegisterModal = true;
      this.navBtnToggle();
    },
    // 登录
    signin () {
      this.showLoginModal = true;
      this.navBtnToggle();
      // window.location.href = `${this.$store.getters.baseUrl}/api/user/githubLogin`
    },
    // 退出登录
    signout () {
      this.$store.dispatch('user/LOGOUT').then((res) => {
        if (res.code === 0) {
          this.navBtnToggle();
          this.$message.success('已退出登录');
        } else {
          this.$message.error('无法退出登录');
        }
      }).catch(err => {
        this.$message.error('无法退出登录');
      })
    },
    registerConfirm () {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          let params = {}
          params.account = this.registerForm.account;
          params.password = this.registerForm.password;
          params.nickname = this.registerForm.nickname;
          params.email = this.registerForm.email;
          this.submitLoading = true;
          this.$store.dispatch('user/REGISTER', params).then(result => {
            this.submitLoading = false;
            this.showRegisterModal = false;
            if (result.code === 0) {
              this.$message.success(result.msg)
            } else {
              this.$message.error(result.msg)
            }
          }).catch(err => {
            this.submitLoading = false;
            this.showRegisterModal = false;
          })
        } else {
          return false;
        }
      })
    },
    loginConfirm () {
      this.$refs.loginForm.validate(valid => {
        this.passwardError = ''
        if (valid) {
          let params = {}
          params.account = this.loginForm.account;
          params.password = this.loginForm.password;
          this.submitLoading = true;
          this.$store.dispatch('user/LOGIN', params).then(result => {
            this.submitLoading = false;
            if (result.code === 0) {
              this.showLoginModal = false;
            } else {
              this.passwardError = '登录失败，请检查账号密码'
            }
          }).catch(err => {
            this.passwardError = '服务器内部错误'
            this.submitLoading = false;
          })
          return false;
        } else {
          return false;
        }
      })
    },
    modalClosed (form) {
      // 重置form
      this.$refs[form].resetFields()
    },
  }
}
</script>
<style lang="less">
@import '~assets/styles/transition.less';
.float-ele {
  position: fixed;
  right: 3rem;
  z-index: 10000;
}
.float-btn {
  width: 4rem;
  height: 4rem;
  line-height: 4rem;
  top: 1rem;
  border-radius: 50%;
  background-color: rgba(0,0,0,.3);
  -webkit-transition: background-color .3s linear;
  transition: background-color .3s linear;
  color: white;
  &:hover {
    background-color: #3d4349;
    cursor: pointer;
  }
  > .btn-line {
    background-color: white;
    height: 0.15rem;
    width: 2rem;
    display: inline-block;
    position: absolute;
    left: 1rem;
    transform-origin: 0 0;
    backface-visibility: hidden;
    transition: all .6s cubic-bezier(.165,.84,.44,1);
    &:nth-of-type(1){
      top: 1.3rem;
    }
    &:nth-of-type(2){
      top: 1.95rem;
    }
    &:nth-of-type(3){
      top: 2.7rem;
    }
  }
  &.close {
    > .btn-line {
      &:nth-of-type(1){
        left: 1.35rem;
        transform: rotateZ(45deg);
      }
      &:nth-of-type(2){
        opacity: 0;
      }
      &:nth-of-type(3){
        transform: rotateZ(-45deg);
        left: 1.2rem;
      }
    }
  }
}
.float-menu {
  top: 5.5rem;
  text-align: center;
  color: white;
  transition: all .3s ease;
  user-select:none;
  ul {
    > li {
      padding: 0.5rem 2rem;
      margin: 0.5rem 0;
      font-size: 1.2rem;
      background-color: rgba(0,0,0,.3);
      border-radius: 0.5rem;
      transition: all .5s ease;
      &:hover {
        background-color: #3d4349;
        cursor: pointer;
      }
    }
  }
}
</style>
