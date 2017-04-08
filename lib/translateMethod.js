/**
 * Translates the given rest endpoint string to the PascalCased method name on ROT.Map object.
 * If the method does not exist, then return Dungeon method as fallback.
 * @param {String} method - translate to PascalCase
 */
module.exports = (method) => {
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
