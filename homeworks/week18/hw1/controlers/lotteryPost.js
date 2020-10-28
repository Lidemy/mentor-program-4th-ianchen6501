const db = require('../models')
const prizes = db.prizes
const utils = require('./utils')

const lotteryPostControler = {
  index: utils.getAllDataAndRender(prizes, '../views/lottery-management-page'),

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

  delete: utils.deleteItem(prizes),
  editTitle: utils.editData(prizes, 'title'),
  editProbability: utils.editData(prizes, 'probability'),
  editContent: utils.editData(prizes, 'content'),
  editImg: utils.editData(prizes, 'photo_url'),

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