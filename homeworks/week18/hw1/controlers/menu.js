const db = require('../models')
const dishes = db.dishes

const menuControler = {
  index : (req, res) => {
    dishes.findAll({
      where : { is_deleted : null},
      //include: user,
      order: [['id', 'DESC']]
    }).then(dishes => {
      res.render('../views/menu', {dishes})
    })
  }
}
module.exports = menuControler