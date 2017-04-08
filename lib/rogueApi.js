// Dependencies
const app = require('./app')
const querystring = require('querystring')
const ROT = require('rot-js')
const translateMethod = require('./translateMethod')

/**
 * Merry endpoint handler for /api/:method
 * @param {HTTP.Request} req Node.js Request Object
 * @param {HTTP.Response} res Node.js Response Object
 * @param {Object} ctx context object, contains endpoint parameter :method
 * @param {Function} done function called when server processing is completed, ultimately sends back to client
 * @see https://github.com/shipharbor/merry
 */
module.exports = (req, res, ctx, done) => {
  // Wrap in a try catch so exceptions do not crash the server.
  try {
    // Convert the querystring to an object that can be used on the Generator function
    const queryParams = querystring.parse(req.url.split('?')[1]) || {}
    // Set default width and height which can be overridden by query params.
    const options = Object.assign({}, { width: 80, height: 25 }, queryParams)
    // take the /:method parameter and translate it to the function name
    // this is because the function names are PascalCased, but the endpoint is lowercase.
    const method = translateMethod(ctx.params.method)
    const Generator = ROT.Map[method]

    // Begin the map generation!!!
    let rogueMap
    let map = []
    rogueMap = new Generator(options.height, options.width, options).create((x, y, v) => {
      // build a map array because some generators dont use it, this normalizes
      // the response payload.
      map[x] = map[x] || []
      map[x][y] = v
    })
    // send to client JSON object of the constructed map
    done(null, Object.assign({}, {map}, rogueMap))
  } catch (e) {
    // If an exception occurred, log the exception and let the client know something bad happened.
    app.log.error(e)
    // sends error 500
    done(e)
  }
}
