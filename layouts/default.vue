<template>
  <el-row class="g-container default-wrapper">
    <el-col :span="5" class="left-col">
      <div class="profile-pic">
        <img :src="avatar" alt="">
      </div>
      <div class="self-info">
        <h3>{{ name }}</h3>
        <h5>{{ motto }}</h5>
      </div>
      <ul class="nav-list">
        <router-link tag="li" to="/" class="nav-item" :class="{'nav-item-active': $route.path==('/' || '/index')}">
          <i class="iconfont icon-index"></i>首页
        </router-link>
        <router-link tag="li" to="/picture" class="nav-item" :class="{'nav-item-active': $route.path=='/picture'}">
          <i class="iconfont icon-picture"></i>照片
        </router-link>
        <router-link tag="li" to="/article" class="nav-item" :class="{'nav-item-active': $route.path=='/article' || $route.path.indexOf('/articleDetail') > -1}">
          <i class="iconfont icon-article2"></i>文章
        </router-link>
      </ul>
      <section class="about-me-wrap">
        <h4><i class="iconfont icon-about-me"></i>关于我</h4>
        <p v-html="aboutMe">
          <!-- 坐标:guangzhou<br>
          目前还是个本科狗<br>
          有个很好的女朋友,希望未来能好好的<br>
          喜欢小猫小狗但是偏偏女朋友害怕<br>
          前端菜鸡一个<br>
          想减肥(但是停留在想的阶段) -->
        </p>
        <ul class="my-connection-list">
          <li id="qq" class="my-connection-item">
            <i class="nav-icon iconfont icon-qq"></i>
            <span class="nav-icon-label">{{ qq }}</span><br>
          </li>
          <li id="weibo" class="my-connection-item" @click="openWeibo()">
            <i class="nav-icon iconfont icon-weibo"></i>
            <span class="nav-icon-label" :data-src="weibo">我的微博</span>
          </li>
        </ul>
      </section>
    </el-col>
    <el-col :span="19" class="main-col-wrap">
      <nuxt />
    </el-col>
    <login-flow-btn></login-flow-btn>
  </el-row>
</template>
<script>
import LoginFlowBtn from '~/components/LoginFlowBtn'
import ThemeMixin from '~/mixins/themeMixin'
import { setTimeout } from 'timers';
export default {
  components: {
    LoginFlowBtn
  },
  mixins: [ThemeMixin],
  data () {
    return {
      avatar: '',
      name: '',
      qq: '',
      weibo: '',
      motto: '',
      aboutMe: '',
    }
  },
  computed: {
    backgroundColor () {
      return this.$route.path.indexOf('/articleDetail') > -1 ? 'white' : '';
    }
  },
  mounted () {
    this.$store.commit('user/SET_USER');
    this.$store.commit('user/SET_IS_LOGIN');
    this.$store.dispatch('blogger/GET_BLOGGER_INFO').then(res => {
      if (res.code === 0) {
        let info = res.bloggerInfo
        this.avatar = info.avatar
        this.aboutMe = info.aboutMe
        this.qq = info.qq
        this.weibo = info.weibo
        this.name = info.name
        this.motto = info.motto
      }
    })
  },
  methods: {
    // 打开我的微博
    openWeibo () {
      window.open("http://weibo.com/u/2119171184?refer_flag=1001030001_&nick=Mr___TTTTTTTT&is_all=1");
    }
  }
}
</script>
<style lang="less">
@import '~assets/styles/variable.less';
.default-wrapper {
  background: @theme-white;
}
.nav-list {
  height: 30vh;
  margin-top: 5vh;
}
.nav-item {
  height: 6vh;
  line-height: 6vh;
  text-align: center;
  font-size: 1.2rem;
  padding-right: 20px;
  &-active,
  &:hover {
    border-right: 4px solid #32d3c3;
    color: #32d3c3;
    background-color: #26252f;
  }
  &:hover {
    cursor: pointer;
  }
}
.about-me-wrap {
  width: 80%;
  text-align: left;
  margin: auto;
}
.nav-icon {
  font-size: 1.8rem;/* 该项与nav-icon-label line-height值相同 */
}
.nav-icon-label {
  display: inline-block;
  line-height: 1.8rem;/* 该项与nav-icon font-size值相同 */
  vertical-align: super;
  padding-left: 0.5rem;
}
.my-connection-list {
  margin: 2vh 0;
  .my-connection-item {
    padding: 0.2rem 0;
  }
  .my-connection-item:hover {
    cursor: default;
  }
}
.btn-bar {
    text-align: center;
}
#qq:hover .icon-qq {
    color: #08b8b9;
    transition: all .2s ease-in;
}
#weibo:hover .icon-weibo {
    color: #ff5907;
    -webkit-transition: all .2s ease-in;
    -moz-transition: all .2s ease-in;
    -o-transition: all .2s ease-in;
    -ms-transition: all .2s ease-in;
    transition: all .2s ease-in;
}
</style>
