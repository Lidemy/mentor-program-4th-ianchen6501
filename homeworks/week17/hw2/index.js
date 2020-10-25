const express = require("express")
const app = express()
const postControler = require('./controlers/post')
const frontControler = require('./controlers/front')
//const commentControler = require('./controlers/comment')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const port = process.env.PORT || 5004
//const $ = require('jquery')


app.use(session({
  secret: 'keyboard cat', //加密方式
  resave: true, //強制將 session 存回 session store
  saveUninitialized: true, //強制將未初始化的session存回 session store
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public')); //將靜態檔案目錄設定為專案根目錄+/public
app.use(flash())
app.set('view engine', 'ejs')
app.set(port)
app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('errorMessage')
  res.locals.userId = req.session.userId
  next()
})

app.get('/', frontControler.index)
app.get('/post', postControler.index)
app.post('/post', postControler.add)
app.get('/delete/:id', postControler.delete)
app.post('/edit_title/:id', postControler.edit_title)
app.post('/edit_probability/:id', postControler.edit_probability)
app.post('/edit_content/:id', postControler.edit_content)
app.post('/edit_img/:id', postControler.edit_img)
app.get('/front_pull', frontControler.pull)
app.get('/front_result', frontControler.result)
app.get('/QA', frontControler.QA)

app.listen(port , () => {
  console.log(`bite app listening at http://localhost:${port}`)
})

