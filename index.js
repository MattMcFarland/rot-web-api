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
  [ '/', homePath ],
  [ '/api/:method', mw([ cors, rogueApi ]) ],
  [ '/404', merry.notFound() ]
])

const env = merry.env({ PORT: process.env.PORT || 8080 })
const server = http.createServer(app.start())

server.listen(env.PORT, () => {
  console.log('server is up and running!')
  console.log('hop on over to http://localhost:' + env.PORT);
})


function rogueApi (req, res, ctx, done) {
  const ROT = require('rot-js')
  const querystring = require('querystring')
  const qs = querystring.parse(req.url)
  const method = translateMethod(ctx.params.method)
  const gen = ROT.Map[method]
  let rogueMap;
  let map = []
  if (method === 'Rogue') {
    rogueMap = new gen(25, 80).create((x, y, v) => {
      map[x] = map[x] || []
      map[x][y] = v
    })
  } else {
    rogueMap = new gen(25, 80).create((x, y, v) => {
      map[x] = map[x] || []
      map[x][y] = v
    })
  }  

  done(null, Object.assign({map}, rogueMap))
}

function homePath (req, res) {
  require('fs').createReadStream('./index.html').pipe(res)
}

function translateMethod(method) {
  switch (method) {
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