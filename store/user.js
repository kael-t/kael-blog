import cookie from 'js-cookie'

export const state = () => {
  return {
    isLogin: false,
    user: null,
    theme: '',
    list: []
  }
}

export const mutations = {
  SET_USER (state) {
    state.user = cookie.getJSON('user')
  },
  SET_IS_LOGIN (state) {
    state.isLogin = cookie.get('token') ? true : false
  },
  SET_THEME (state, theme) {
    state.theme = theme
    window.localStorage.setItem('theme', state.theme)
  }
}

export const actions = {
  // 检查账号是否可用
  async CHECK_ACCOUNT ({ commit, state, getters }, params) {
    const data = await this.$axios.post('/api/user/checkAccount', params)
    return data
  },
  // 注册
  async REGISTER ({ commit, state, getters }, params) {
    const data = await this.$axios.post('/api/user/register', params)
    commit('SET_USER')
    commit('SET_IS_LOGIN')
    return data
  },
  // 登录
  async LOGIN ({ commit, state, getters }, params) {
    const data = await this.$axios.post('/api/user/login', params)
    commit('SET_USER')
    commit('SET_IS_LOGIN')
    return data
  },
  // 退出登录
  async LOGOUT ({ commit, state, getters }) {
    const data = await this.$axios.post('/api/user/logout')
    commit('SET_USER')
    commit('SET_IS_LOGIN')
    return data
  },
  // 获取用户列表
  async GET_USER_LIST ({ commit, state, getters }, params) {
    console.log(params)
    const data = await this.$axios.get('/api/user/getUserList', {params: params})
    return data
  },
}