const md5 = require('md5');

const utils = {
  md5Encrypt (str) {
    if (str) {
      return md5(str)
    }
  }
}

module.exports = utils;