// Dependencies
const corsMiddleware = require('cors-middleware')
const merry = require('merry')
const rogueApi = require('./rogueApi')
const staticFile = require('./staticFile')

const logLevel = process.env.NODE_ENV === 'test' ? 'error' : 'info'
const app = merry({logLevel})

// Disable any CORS restrictions for GET requests from all domains
// only used for /api/:method so external applications have
// permission to send requests to the endpoint
const crossOriginAllowAll = corsMiddleware({
  methods: 'GET',
  origin: '*'
})

// Setup route handlers
app.router([
  [ '/', staticFile('index.html') ],
  [ '/favicon.ico', staticFile('favicon.ico') ],
  [ '/api/:method', merry.middleware([ crossOriginAllowAll, rogueApi ]) ],
  [ '/404', merry.notFound() ]
])

module.exports = app
