const db = require('../models')
const questionAnswer = db.question_answers

const questionAnswerControler = {
  frontpageIndex: (req, res)=> {
    questionAnswer.findAll({
      where : { is_deleted : null},
      order: [['id', 'ASC']]
    }).then(qas => {
      res.locals.test = 'hi'
      res.render('../views/question-answer', {qas})
    }).catch(error => {
      console.log(error.toString())
      res.redirect('back')
    })
  },

  postpageIndex : (req, res) => {
    questionAnswer.findAll({
      where : { is_deleted : null},
      //include: user,
      order: [['id', 'ASC']]
    }).then(qas => {
      res.render('../views/question-answer-management-page', {qas})
    }).catch(error => {
      console.log(error.toString())
      res.redirect('/')
    })
  },

  add: (req, res) => {
    if(req.body.title === '' || req.body.console === '') {
      req.flash('errorMsg', '請輸入完整內容')
      return res.redirect('back')
    }
    const title = req.body.title
    const content = req.body.content
    questionAnswer.create({
      title,
      content
    }).then(() => {
      res.redirect('back')
    }).catch(error => {
      console.log(error.toString())
      res.redirect('back') //會拿到 request.head.referer 沒有指定則預設為 '/'
    })
  },

  delete: (req, res) => {
    const id = req.params.id
    questionAnswer.findOne({
      where : { id : id}
    }).then(qa => {
      qa.update({
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
    questionAnswer.findOne({
      where : { id : id}
    }).then(qa => {
      qa.update({
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
    questionAnswer.findOne({
      where : { id : id}
    }).then(qa => {
      qa.update({
        content : content
      })
      res.redirect('back')
    }).catch(error => {
      console.log(error.toString())
      res.redirect('back')
    })
  },

}

module.exports = questionAnswerControler