const db = require('../models')
const dishes = db.dishes
const utils = require('./utils')

const dishesControler = {
  index : utils.getAllDataAndRender(dishes, '../views/dishes-management-page'),

  add: (req, res) => {
    if(req.body.title === '' || req.body.console === '' || req.body.price ==='' || req.body.photo_url === '') {
      req.flash('errorMsg', '請輸入完整內容')
      return res.redirect('back')
    }
    const title = req.body.title
    const content = req.body.content
    const price = req.body.price
    const photo_url = req.body.photo_url
    dishes.create({
      title,
      content,
      price,
      photo_url
    }).then(() => {
      res.redirect('back')
    }).catch(error => {
      req.flash('errorMessage', error.toString())
      res.redirect('back') //會拿到 request.head.referer 沒有指定則預設為 '/'
    })
  },

  delete: utils.deleteItem(dishes),

  editTitle: utils.editData(dishes, 'title'),
  editContent: utils.editData(dishes, 'content'),
  editPrice: utils.editData(dishes, 'price'),
  editImg: utils.editData(dishes, 'photo_url'),
}

module.exports = dishesControler