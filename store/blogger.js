export const actions = {
  // 获取博主信息
  async GET_BLOGGER_INFO ({ commit, state, getters }) {
    const data = await this.$axios.get('/api/blogger/getBloggerInfo')
    return data
  },
  // 设置博主信息
  async SET_BLOGGER_INFO ({ commit, state, getters }, params) {
    const data = await this.$axios.post('/api/blogger/updateBloggerInfo', params)
    return data
  },
}