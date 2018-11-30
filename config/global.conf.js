const IS_PROD = process.env.NODE_ENV === 'production'

const domain = IS_PROD ? '' : 'http://localhost:3000'
const host = IS_PROD ? '' : '127.0.0.1'
const port = IS_PROD ? '' : 3000

module.exports = {
  domain,
  host,
  port
}