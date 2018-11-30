const config = require('../config')

export default {
  baseUrl () {
    let envConfig = config.globalConfig
    let url = ''
    if (envConfig.domain) {
      url = `${envConfig.domain}`
    } else {
      url = `//${envConfig.host}:${envConfig.port}`
    }
    return url
  }
}