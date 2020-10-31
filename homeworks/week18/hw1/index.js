const express = require('express')
const cors = require('cors')
const app = express()
const homepageFrontControler = require('./controlers/homepage')
const lotteryPostControler = require('./controlers/lotteryPost')
const lotteryFrontControler = require('./controlers/lotteryFront')
const dishesControler = require('./controlers/dishes')
const menuControler = require('./controlers/menu')
const questionAnswerControler = require('./controlers/questionAnswer')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const port = process.env.PORT || 5004
//const $ = require('jquery')

const corsOptions = {
  origin: [
    '*',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(session({
  secret: process.env.secret, //加密方式
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
  res.locals.errorMsg = req.flash('errorMsg')
  res.locals.userId = req.session.userId
  next()
})

/*
app.get('/with-cors', cors(), (req, res, next) => {
  res.json({ msg: 'WHOAH with CORS it works! 🔝 🎉' })
})
*/
app.get('/', homepageFrontControler.index)
app.get('/lottery-management-page', lotteryPostControler.index)
app.post('/lottery-management-page', lotteryPostControler.add)
app.get('/lottery-delete/:id', lotteryPostControler.delete)
app.post('/lottery-edit-title/:id', lotteryPostControler.editTitle)
app.post('/lottery-edit-probability/:id', lotteryPostControler.editProbability)
app.post('/lottery-edit-content/:id', lotteryPostControler.editContent)
app.post('/lottery-edit-img/:id', lotteryPostControler.editImg)
app.get('/lottery-pull', lotteryFrontControler.pull)
app.get('/lottery-result', lotteryFrontControler.result)
app.get('/menu', menuControler.index)
app.get('/dishes-management-page', dishesControler.index)
app.post('/dishes-management-page', dishesControler.add)
app.get('/dishes-delete/:id', dishesControler.delete)
app.post('/dishes-edit-title/:id', dishesControler.editTitle)
app.post('/dishes-edit-content/:id', dishesControler.editContent)
app.post('/dishes-edit-price/:id', dishesControler.editPrice)
app.post('/dishes-edit-img/:id', dishesControler.editImg)
app.get('/question-answer', questionAnswerControler.frontpageIndex)
app.get('/qustion-answer-management-page', questionAnswerControler.postpageIndex)
app.post('/qustion-answer-management-page', questionAnswerControler.add)
app.get('/qustion-answer-delete/:id', questionAnswerControler.delete)
app.post('/qustion-answer-edit-title/:id', questionAnswerControler.editTitle)
app.post('/qustion-answer-edit-content/:id', questionAnswerControler.editContent)
app.post('/lottery-management-page-upload-img/:encodeTitle', lotteryPostControler.addImg)


app.listen(port , () => {
  console.log(`bite app listening at http://localhost:${port}`)
})

