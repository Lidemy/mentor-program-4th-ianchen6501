const db = require('../models')
const prize = db.prize
const user = db.user

const postControler = {
  index: (req, res) => {
    prize.findAll({
      where : { is_deleted : null},
      include: user,
      order: [['id', 'DESC']]
    }).then(prizes => {
      res.render('../views/post', {prizes})
    }).catch(error => {
      console.log(error.toString())
      res.redirect('/')
    })
  },

  add: (req, res) => {
    const title = req.body.title
    const content = req.body.content
    const probability = req.body.propability
    const photo_url = req.body.photo_url
    prize.create({
      title,
      content,
      probability,
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
    prize.findOne({
      where : { id : id}
    }).then(prize => {
      prize.update({
        is_deleted : 1
      })
      res.redirect('back')
    }).catch(error => {
      console.log(error.toString())
      res.redirect('back')
    })
  },

  edit_title: (req, res) => {
    const id = req.params.id
    const content = req.body.title
    prize.findOne({
      where : { id : id}
    }).then(prize => {
      prize.update({
        title : content
      })
      res.redirect('back')
    }).catch(error => {
      console.log(error.toString())
      res.redirect('back')
    })
  },

  edit_probability: (req, res) => {
    const id = req.params.id
    const content = req.body.probability
    prize.findOne({
      where : { id : id}
    }).then(prize => {
      prize.update({
        probability : content
      })
      res.redirect('back')
    }).catch(error => {
      console.log(error.toString())
      res.redirect('back')
    })
  },

  edit_content: (req, res) => {
    const id = req.params.id
    const content = req.body.content
    prize.findOne({
      where : { id : id}
    }).then(prize => {
      prize.update({
        content : content
      })
      res.redirect('back')
    }).catch(error => {
      console.log(error.toString())
      res.redirect('back')
    })
  },

  edit_img: (req, res) => {
    console.log('1')
    const id = req.params.id
    const content = req.body.img
    prize.findOne({
      where : { id : id}
    }).then(prize => {
      prize.update({
        photo_url : content
      })
      res.redirect('back')
    }).catch(error => {
      console.log(error.toString())
      res.redirect('back')
    })
  }
}


module.exports = postControler