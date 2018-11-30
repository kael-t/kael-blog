const githubConfig = require('../../config').githubConfig
const domain = require('../../config').globalConfig.domain
const axios = require('axios')

const UserController = {
  githubLogin (req, res, next) {
    let state = req.query.state || ''
    let url = `https://github.com/login/oauth/authorize?client_id=${githubConfig.client_id}&scope=${githubConfig.scope}`
    res.redirect(302, url)
  },
  async callback (req, res, next) {
    let code = req.query.code
    let url = `https://github.com/login/oauth/access_token?client_id=${githubConfig.client_id}&client_secret=${githubConfig.client_secret}&code=${code}`
    let map = {}
  
    await axios.get(url).then((resp) => {
      const { data } = resp
      let arr = data.split('&')
      arr.forEach((item) => {
        let key = item.split('=')[0]
        let value = item.split('=')[1]
        map[key] = value
      })
      res.cookie('githubToken', map.access_token || '')
    })
    if (map.access_token) {
      let userInfo = {}
      await axios.get(`https://api.github.com/user?access_token=${map.access_token}`).then(resp => {
        const { data } = resp
        userInfo.role = 'user'
        userInfo.nickname = data.login
        userInfo.email = data.email
        userInfo.username = data.name
        userInfo.motto = data.bio
        userInfo.avatar = data.avatar_url
      })
    }
    return res.redirect(302, `${domain}`)
  }
}

module.exports = UserController