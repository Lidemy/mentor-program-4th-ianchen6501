const db = require('../models')
const questionAnswer = db.question_answers
const utils = require('./utils')

const questionAnswerControler = {
  frontpageIndex: utils.getAllDataAndRender(questionAnswer, '../views/question-answer'),
  postpageIndex : utils.getAllDataAndRender(questionAnswer, '../views/question-answer-management-page'),

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

  delete: utils.deleteItem(questionAnswer),
  editTitle: utils.editData(questionAnswer, 'title'),
  editContent: utils.editData(questionAnswer, 'content'),
}

module.exports = questionAnswerControler