const db = require('../models')
const dishes = db.dishes

const dishesControler = {
  index : (req, res) => {
    dishes.findAll({
      where : { is_deleted : null},
      //include: user,
      order: [['id', 'DESC']]
    }).then(dishes => {
      res.render('../views/dishes-management-page', {dishes})
    }).catch(error => {
      console.log(error.toString())
      res.redirect('/')
    })
  },

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

  delete: (req, res) => {
    const id = req.params.id
    dishes.findOne({
      where : { id : id}
    }).then(dish => {
      dish.update({
        is_deleted : 1
      })
      res.redirect('back')
    }).catch(error => {
      console.log(error.toString())
      res.redirect('back')
    })
  },

  editTitle: (req, res) => {
    const id = req.params.id
    const content = req.body.title
    dishes.findOne({
      where : { id : id}
    }).then(dish => {
      dish.update({
        title : content
      })
      res.redirect('back')
    }).catch(error => {
      console.log(error.toString())
      res.redirect('back')
    })
  },

  editContent: (req, res) => {
    const id = req.params.id
    const content = req.body.content
    dishes.findOne({
      where : { id : id}
    }).then(dish => {
      dish.update({
        content : content
      })
      res.redirect('back')
    }).catch(error => {
      console.log(error.toString())
      res.redirect('back')
    })
  },

  editPrice: (req, res) => {
    const id = req.params.id
    const content = req.body.price
    dishes.findOne({
      where : { id : id}
    }).then(dish => {
      dish.update({
        price : content
      })
      res.redirect('back')
    }).catch(error => {
      console.log(error.toString())
      res.redirect('back')
    })
  },

  editImg: (req, res) => {
    const id = req.params.id
    const content = req.body.img
    dishes.findOne({
      where : { id : id}
    }).then(dish => {
      dish.update({
        photo_url : content
      })
      res.redirect('back')
    }).catch(error => {
      console.log(error.toString())
      res.redirect('back')
    })
  },

}

module.exports = dishesControler