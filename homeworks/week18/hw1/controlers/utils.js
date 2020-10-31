const utils = {
  getAllDataAndRender : (db, url) => {
    return (req, res) => {
      db.findAll({
        where : { is_deleted : null},
        order: [['id', 'DESC']]
      }).then(data => {
        res.render(url, {data})
      }).catch(error => {
        console.log(error.toString())
        res.redirect('/')
      })
    }
  },

  editData: (db, attribute) => {
    return async (req, res) => {
      const id = req.params.id
      const content = req.body[attribute]
      const obj = new Object()
      obj[attribute] = content
      db.findOne({where : {id : id}})
      .then(item => {
        item.update(obj)
        .then(() => {res.redirect('back')})
        .catch(error => {
          console.log(error.toString())
          res.redirect('back')
        })
      }).catch(error => {
        console.log(error.toString())
        res.redirect('back')
      })
    }
  },

  deleteItem: (db) => {
    return (req, res) => {
      const id = req.params.id
      db.findOne({
        where : { id : id}
      }).then(dish => {
        dish.update({is_deleted : 1})
        res.redirect('back')
      }).catch(error => {
        console.log(error.toString())
        res.redirect('back')
      })
    }
  }
}


module.exports = utils