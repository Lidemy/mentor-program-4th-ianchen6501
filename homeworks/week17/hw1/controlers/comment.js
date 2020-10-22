const db = require('../models')
const comment = db.blog_comment
const user = db.blog_user

const commentControler = {
  index: (req, res) => {
    comment.findAll({
      where : { is_deleted : null},
      include: user,
      order: [['id', 'DESC']]
    })
    .then(comments => {
      res.render('./index', {comments})
    }).catch(error => {
      console.log(error)
    })
  },

  create: (req, res) => {
    res.render('./comment/create')
  },

  handleCreate: (req, res) => {
    if(!req.body.title || !req.body.content) {
      req.flash('errorMessage', 'please fill in the blank field')
      return res.redirect('/create')
    }
    const title = req.body.title
    const content = req.body.content
    const userId = req.session.userId
    comment.create({
      title: title,
      content: content,
      blogUserId: userId
    }).then(() => {
      res.redirect('/')
    }).catch(error => {
      req.flash('errorMessage', error.toString())
      res.redirect('/create')
    })
  },

  edit: (req, res) => {
    const id = req.params.id
    comment.findOne({
      where: {
        id
      }
    }).then(result => {
      const content = result
      res.render(`./comment/edit`, {content, id})
    })
  },

  handleEdit: (req, res) => {
    if(!req.body.title || !req.body.content) {
      req.flash('errorMessage', 'please fill in the blank field')
      return res.redirect(`/edit/${id}`)
    }
    const id = req.params.id
    const title = req.body.title
    const content = req.body.content
    const userId = req.session.userId
    comment.update({
      title, content
    }, {
      where: {
        id,blogUserId: userId
      }
    }).then(()=> {
      res.redirect('/')
    }).catch(error => {
      req.flash('errorMessage', error.toString())
      return res.redirect(`/edit/${id}`)
    })
  },

  readmore: (req, res) => {
    const id = req.params.id
    comment.findOne({
      where: {id}
    }).then(comment => {
      res.render(`./comment/readmore`, {comment})
    })
  },

  list: (req, res) => {
    comment.findAll({
      where : { is_deleted : null},
      include: user,
      order: [['id', 'DESC']]
    })
    .then(comments => {
      res.render('./list', {comments})
    }).catch(error => {
      console.log(error)
    })
  },

  manage: (req, res) => {
    comment.findAll({
      where : { is_deleted : null},
      include: user,
      order: [['id', 'DESC']]
    })
    .then(comments => {
      res.render('./manage', {comments})
    }).catch(error => {
      console.log(error)
    })
  },

  delete: (req, res) => {
    const id = req.params.id
    const userId = req.session.userId
    comment.findOne({      
      where: {
      id,blogUserId: userId
      }
    }).then(comment => {
      comment.update({
        is_deleted : 1
      })
      res.redirect('/manage')
    }).catch(error => {
      console.log(error)
      res.redirect('/manage')
    })
  }
}


module.exports = commentControler