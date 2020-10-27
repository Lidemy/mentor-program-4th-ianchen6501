const db = require('../models')
const prizes = db.prizes

const lotteryPostControler = {
  index: (req, res) => {
    prizes.findAll({
      where : { is_deleted : null},
      //include: user,
      order: [['id', 'DESC']]
    }).then(prizes => {
      res.render('../views/lottery-management-page', {prizes})
    }).catch(error => {
      console.log(error.toString())
      res.redirect('/')
    })
  },

  add: (req, res) => {
    if(req.body.title === '' || req.body.console === '' || req.body.probability ==='' || req.body.photo_url === '') {
      req.flash('errorMsg', '請輸入完整內容')
      return res.redirect('back')
    }
    const values = req.body //object
    const title = values.title
    const content = values.content
    const probability = values.probability
    const photo_url = values.photo_url
    prizes.create({
      title,
      content,
      probability,
      photo_url,
    }).then(() => {
      res.redirect('back')
    }).catch(error => {
      req.flash('errorMessage', error.toString())
      res.redirect('back') //會拿到 request.head.referer 沒有指定則預設為 '/'
    })
  },

  delete: (req, res) => {
    const id = req.params.id
    prizes.findOne({
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

  editTitle: (req, res) => {
    const id = req.params.id
    const content = req.body.title
    prizes.findOne({
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

  editProbability: (req, res) => {
    const id = req.params.id
    const content = req.body.probability
    prizes.findOne({
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

  editContent: (req, res) => {
    const id = req.params.id
    const content = req.body.content
    prizes.findOne({
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

  editImg: (req, res) => {
    const id = req.params.id
    const content = req.body.img
    prizes.findOne({
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
  },

  addImg: (req, res) => {
    const file = req.body
    //console.log(file)
    const encodeTitle = req.params.encodeTitle
    //console.log(encodeTitle)
    const title = decodeURI(encodeTitle)
    console.log(title)
    const values = {img: file}
    const condition = {where: {title: title}}
    const options = { multi: true }
    prizes.update(values, condition, options
    ).then(() => {
      res.redirect('back')
      console.log('sucess')
    }).catch(error => {
      console.log('errorMessage', error.toString())
      res.redirect('back')
    })
  }
}


module.exports = lotteryPostControler