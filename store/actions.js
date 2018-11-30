import axios from 'axios'

export default {
  async BLOGGER_INFO ({ commit, state, getters }, params) {
    const { data } = await axios.post(`${getters.baseUrl}/blogger/getBloggerInfo`, params)
    return data
  }
}