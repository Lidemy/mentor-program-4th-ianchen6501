const db = require('../models')
const dishes = db.dishes
const utils = require('./utils')

const menuControler = {
  index : utils.getAllDataAndRender(dishes, '../views/menu')
}

module.exports = menuControler