const corsMiddleware = require('cors-middleware')
const merry = require('merry')
const http = require('http')

const app = merry()
const mw = merry.middleware
const cors = corsMiddleware({
  methods: 'GET',
  origin: '*'
})

app.router([
  [ '/', staticFile('./index.html') ],
  [ '/favicon.ico', staticFile('./favicon.ico') ],
  [ '/api/:method', mw([ cors, rogueApi ]) ],
  [ '/404', merry.notFound() ]
])

const env = merry.env({ PORT: process.env.PORT || 8080 })
const server = http.createServer(app.start())

server.listen(env.PORT, () => {
  app.log.info('listening', { url: 'http://localhost:' + env.PORT})
})

function rogueApi (req, res, ctx, done) {
  const ROT = require('rot-js')
  const querystring = require('querystring')
  try {
    const queryParams = querystring.parse(req.url.split('?')[1]) || {}
    const method = translateMethod(ctx.params.method)
    const gen = ROT.Map[method]
    const options = Object.assign({}, { width: 80, height: 25 }, queryParams)

    let rogueMap;
    let map = []
    rogueMap = new gen(options.height, options.width, options).create((x, y, v) => {
      map[x] = map[x] || []
      map[x][y] = v
    })
    done(null, Object.assign({}, {map}, rogueMap))
  } catch (e) {
    app.log.error(e)
    done(e)
  }
}

function staticFile(filepath) {
  const fs = require('fs')
  return function (req, res) {
    fs.createReadStream(filepath).pipe(res)
  }
}

function translateMethod(method) {
  switch (method) {
    case 'arena':
      return 'Arena'
    case 'iceymaze':
      return 'IceyMaze'
    case 'ellermaze':
      return 'EllerMaze'
    case 'cellular':
      return 'Cellular'
    case 'uniform':
      return 'Uniform'
    case 'digger':
      return 'Digger'
    case 'rogue':
      return 'Rogue'
    default:
      return 'Dungeon'
  }
}