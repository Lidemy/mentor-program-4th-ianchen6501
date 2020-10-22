const express = require("express")
const app = express()
const userControler = require('./controlers/user')
const commentControler = require('./controlers/comment')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const port = process.env.PORT || 5003

app.use(session({
  secret: 'keyboard cat', //加密方式
  resave: true, //強制將 session 存回 session store
  saveUninitialized: true, //強制將未初始化的session存回 session store
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
app.use(flash())

app.set('view engine', 'ejs')
app.set(port) 

app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('errorMessage')
  res.locals.userId = req.session.userId
  next()
})


app.get('/', commentControler.index)
app.get('/login', userControler.login)
app.post('/login', userControler.handleLogin)
app.get('/logout', userControler.logout)

app.get('/create', commentControler.create)
app.post('/create', commentControler.handleCreate)

app.get('/edit/:id', commentControler.edit)
app.post('/edit/:id', commentControler.handleEdit)

app.get('/readmore/:id', commentControler.readmore)
app.get('/manage', commentControler.manage)
app.get('/list', commentControler.list)
app.get('/delete/:id', commentControler.delete)



app.listen(port , () => {
  console.log(`blog app listening at http://localhost:${port}`)
})