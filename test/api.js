process.env.HOST = '0.0.0.0'
process.env.PORT = '5000'
process.env.NODE_ENV = 'test'
const { describe, it, beforeEach, afterEach } = require('mocha')
const assert = require('assert')
const http = require('http')
const server = require('../lib/server')

describe('API', () => {
  beforeEach(done => server.start(done))
  afterEach(() => server.stop())

  describe('/api/arena', () => {
    it('does not throw exception', (done) => {
      get('/api/arena', (err) => {
        assert(!err, 'exception cannot occur')
        done()
      })
    })
    it('returns 200', (done) => {
      get('/api/arena', (_, res) => {
        assert(res.statusCode === 200, 'statusCode must be 200')
        done()
      })
    })
    it('returns map array', (done) => {
      get('/api/arena', (_, res) => {
        assert(Array.isArray(JSON.parse(res.body).map), 'must return map array')
        done()
      })
    })
  })
  describe('/api/iceymaze', () => {
    it('does not throw exception', (done) => {
      get('/api/iceymaze', (err) => {
        assert(!err, 'exception cannot occur')
        done()
      })
    })
    it('returns 200', (done) => {
      get('/api/iceymaze', (_, res) => {
        assert(res.statusCode === 200, 'statusCode must be 200')
        done()
      })
    })
    it('returns map array', (done) => {
      get('/api/iceymaze', (_, res) => {
        assert(Array.isArray(JSON.parse(res.body).map), 'must return map array')
        done()
      })
    })
  })
  describe('/api/ellermaze', () => {
    it('does not throw exception', (done) => {
      get('/api/ellermaze', (err) => {
        assert(!err, 'exception cannot occur')
        done()
      })
    })
    it('returns 200', (done) => {
      get('/api/ellermaze', (_, res) => {
        assert(res.statusCode === 200, 'statusCode must be 200')
        done()
      })
    })
    it('returns map array', (done) => {
      get('/api/ellermaze', (_, res) => {
        assert(Array.isArray(JSON.parse(res.body).map), 'must return map array')
        done()
      })
    })
  })
  describe('/api/cellular', () => {
    it('does not throw exception', (done) => {
      get('/api/cellular', (err) => {
        assert(!err, 'exception cannot occur')
        done()
      })
    })
    it('returns 200', (done) => {
      get('/api/cellular', (_, res) => {
        assert(res.statusCode === 200, 'statusCode must be 200')
        done()
      })
    })
    it('returns map array', (done) => {
      get('/api/cellular', (_, res) => {
        assert(Array.isArray(JSON.parse(res.body).map), 'must return map array')
        done()
      })
    })
  })
  describe('/api/uniform', () => {
    it('does not throw exception', (done) => {
      get('/api/uniform', (err) => {
        assert(!err, 'exception cannot occur')
        done()
      })
    })
    it('returns 200', (done) => {
      get('/api/uniform', (_, res) => {
        assert(res.statusCode === 200, 'statusCode must be 200')
        done()
      })
    })
    it('returns map array', (done) => {
      get('/api/uniform', (_, res) => {
        assert(Array.isArray(JSON.parse(res.body).map), 'must return map array')
        done()
      })
    })
  })
  describe('/api/digger', () => {
    it('does not throw exception', (done) => {
      get('/api/digger', (err) => {
        assert(!err, 'exception cannot occur')
        done()
      })
    })
    it('returns 200', (done) => {
      get('/api/digger', (_, res) => {
        assert(res.statusCode === 200, 'statusCode must be 200')
        done()
      })
    })
    it('returns map array', (done) => {
      get('/api/digger', (_, res) => {
        assert(Array.isArray(JSON.parse(res.body).map), 'must return map array')
        done()
      })
    })
  })
  describe('/api/rogue', () => {
    it('does not throw exception', (done) => {
      get('/api/rogue', (err) => {
        assert(!err, 'exception cannot occur')
        done()
      })
    })
    it('returns 200', (done) => {
      get('/api/rogue', (_, res) => {
        assert(res.statusCode === 200, 'statusCode must be 200')
        done()
      })
    })
    it('returns map array', (done) => {
      get('/api/rogue', (_, res) => {
        assert(Array.isArray(JSON.parse(res.body).map), 'must return map array')
        done()
      })
    })
  })
  describe('/api/asdfasd', () => {
    it('does not throw exception', (done) => {
      get('/api/asdfasd', (err) => {
        assert(!err, 'exception cannot occur')
        done()
      })
    })
  })
})

// helper function does the get requests to server :)
function get (uri, cb) {
  const req = http.request({
    method: 'GET',
    hostname: process.env.HOST,
    port: process.env.PORT,
    path: uri
  }, (res) => {
    let buffer = ''
    res.on('data', (chunk) => {
      buffer += chunk.toString()
    })
    res.on('error', e => cb(e))
    res.on('end', () => {
      cb(null, Object.assign({}, res, { body: buffer }))
    })
  })
  req.end()
}
