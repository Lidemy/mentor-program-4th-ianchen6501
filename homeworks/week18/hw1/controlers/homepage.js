const db = require('../models')
const prize = db.prize
const user = db.user
const db_qas = db.QA

const mainFrontControler = {
  index: (rex, res)=> {
    res.render('../views/homepage')
  }
}


module.exports = mainFrontControler