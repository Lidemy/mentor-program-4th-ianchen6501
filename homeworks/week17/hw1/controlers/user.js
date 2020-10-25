const db = require('../models')
const user = db.blog_user

const userModeler = {
  login: (req, res) => {
    res.render('./user/login')
  },

  handleLogin: (req, res) => {
    if(!req.body.username || !req.body.password) {
      req.flash('errorMessage', 'please fill in the blank field!')
      return res.redirect('/login')
    }
    user.findAll()
    .then((user) => {
      if(user[0].password !== req.body.password || user[0].username !== req.body.username ) {
        req.flash('errorMessage', 'wrong username or password!')
        return res.redirect('/login')
      }
      req.session.userId = user[0].id
      res.redirect('/')
    }).catch((error) => {
      if(error) {
        req.flash('errorMessage', error.toString())
        return res.redirect('/login')
      }
    })
  },

  logout: (req, res) => {
    req.session.userId = ''
    res.redirect('/')
  }
}


module.exports = userModeler