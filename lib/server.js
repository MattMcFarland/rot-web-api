// Dependencies
const merry = require('merry')
const http = require('http')
const app = require('./app')
const server = http.createServer(app.start())
// Setup environment variables, use defaults if not defined.
// Works great with Heroku!
const env = merry.env({
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 8080
})

// If this module is required() in, then expose a simple start/stop api
// otherwise just run it.
if (module.parent) {
  module.exports = {
    start: start,
    stop: () => {
      server.close()
    }
  }
} else {
  start()
}

// start function (is hoisted) that starts the server.
function start (done) {
  server.listen(env.PORT, () => {
    app.log.info('listening', {
      url: `http://${env.HOST}:${env.PORT}`
    })
  })
  typeof done === 'function' && done()
}
