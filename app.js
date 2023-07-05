const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require('cookie-parser');

app.use(cookieParser());
const home = require('./src/routes/home')

app.set('views', './src/public/views')
app.set("view engine", "ejs");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.use('/', home)

module.exports = app


// app.get('/', async (req, res) => {
//   isLogin = false
//   if(req.headers.cookie === undefined){
//     res.render(__dirname + '', {
//       isLogin: isLogin
//     });
//   }else{
//     let cookie = req.headers.cookie.split('=')
//     let userid = cookie[1]

//     const login_data = await db.select('*').from('user').where('id', userid);

//     if(login_data.length != 0){
//       isLogin = true
//     }
    
//     res.render(__dirname + '/html/index.html', {
//       userid: userid,
//       isLogin: isLogin
//     });
//   }
// })

// app.get('/', (req, res) => {
//   res.render(__dirname + '/public/html/index.ejs');
// })

// app.get('/logout', (req, res) => {
//   res.setHeader('Set-Cookie','login=podo; Max-Age=0;')
//   res.redirect('/')
// })

// app.get('/sangdam', async (req, res) => {
//   isLogin = false

//   if(req.headers.cookie === undefined){
//     res.render(__dirname + '/public/html/sangdam.ejs', {
//       isLogin: isLogin
//     });
//   }else{
//     let cookie = req.headers.cookie.split('=')
//     let userid = cookie[1]

//     const login_data = await db.select('*').from('user').where('id', userid);

//     if(login_data.length != 0){
//       isLogin = true
//     }

//     res.render(__dirname + '/public/html/sangdam.ejs', {
//       userid, userid,
//       isLogin: isLogin
//     });
//   }
// })

// app.get('/mypage', async (req, res) => {
//   isLogin = false
//   if(req.headers.cookie === undefined){
//     res.redirect('/')

//   }else{
//     let cookie = req.headers.cookie.split('=')
//     let userid = cookie[1]

//     const login_data = await db.select('*').from('user').where('id', userid);

//     if(login_data.length != 0){
//       isLogin = true
//     }

//     res.render(__dirname + '/public/html/mypage.ejs', {
//       userid, userid,
//       isLogin: isLogin
//     });
//   }
// })

// app.get('/signup', (req, res) => {
//   res.sendFile(__dirname + '/public/html/sign_up.html');
// })

// app.get('/login', (req, res) => {
//   res.sendFile(__dirname + '/public/html/login.html');
// })
