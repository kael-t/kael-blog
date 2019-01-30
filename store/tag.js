export const state = () => {
  return {
    list: []
  }
}

export const mutations = {
  SET_LIST (state, tagList) {
    state.list = tagList
  }
}

export const actions = {
  async GET_TAG_LIST ({ commit, state, getters }) {
    const data = await this.$axios.get('/api/tag/getTagList')
    commit('SET_LIST', data.tagList)
    return data
  },
  async CREATE_TAG ({ commit, state, getters }, params) {
    const data = await this.$axios.post('/api/tag/createTag', params)
    return data
  },
}