export const actions = {
  // 保存文章
  async SAVE_ARTICLE ({ commit, state, getters }, params) {
    const data = await this.$axios.post('/api/article/saveArticle', params)
    return data
  },

  // 获取文章详情
  async GET_ARTICLE_DETAIL ({ commit, state, getters }, params) {
    const data = await this.$axios.get('/api/article/getArticleDetail', { params })
    return data
  },

  // 获取文章列表
  async GET_ARTICLE_LIST ({ commit, state, getters }) {
    const data = await this.$axios.get('/api/article/getArticleList')
    return data
  }
}