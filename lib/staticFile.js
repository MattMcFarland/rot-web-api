// Dependencies
const fs = require('fs')
const path = require('path')
const resolveStaticPath = (filepath) => path.resolve(__dirname, './static', filepath)

/**
 * Serve a file from ./static directory
 * @param   {String} filename to serve.
 * @returns {Function} called by Merry as endpoint handler.
 */
module.exports = (filename) => {
  /**
   *  Merry endpoint handler
   */
  return function (req, res) {
    fs.createReadStream(resolveStaticPath(filename)).pipe(res)
  }
}
