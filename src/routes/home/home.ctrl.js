const knex = require('knex')
const md5 = require('md5')
const cookie = require('cookie')
const crypto = require('crypto')

let isLogin = false

const db = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'nide_project'
  }
})

const output = {
  index: async (req, res) => {
    let cookies = {};
    let userId = "";
    if(req.headers.cookie !== undefined){
      cookies = cookie.parse(req.headers.cookie);
    }

    if(cookies.UUID !== undefined){
      userId = cookies.UUID;
    }

    const check_data = await db.select('*').from('users').where('id', userId);
    
    const contt = await db.select('*').from('consultations');

    if(check_data.length != 0){
      res.render('index', {userId: userId, consulatations: contt})
      return;
    } 

    userId = "";
    res.render('index', {userId: userId, consulatations: contt})
  },
  login: async (req, res) => {
    let cookies = {};
    let userId = "";
    
    if(req.headers.cookie !== undefined){
      cookies = cookie.parse(req.headers.cookie);
    }

    if(cookies.UUID !== undefined){
      const check_data = await db.select('*').from('users').where('id', cookies.UUID);

      if(check_data.length != 0){
        res.redirect('/');
        return;
      } 

      userId = "";
      res.render('login', {userId: userId, error: false})
      return;
    }

    res.render('login', {userId: userId, error: false})
    
  },
  signup: async (req, res) => {
    let cookies = {};
    let userId = "";
    
    if(req.headers.cookie !== undefined){
      cookies = cookie.parse(req.headers.cookie);
    }

    if(cookies.UUID !== undefined){
      const check_data = await db.select('*').from('users').where('id', cookies.UUID);
      
      if(check_data.length != 0){
        res.redirect('/');
        return;
      } 

      userId = "";
      res.render('sign_up', {userId: userId, error: false})
      return;
    }

    res.render('sign_up', {userId: userId, error: false})
  },
  logout: (req, res) => {
    res.clearCookie('UUID');
    res.redirect('/');
  }
}

const process = {
  login: async (req, res) => {
    try{
      const login_data = await db.select('*').from('users').where('id', req.body.username).where('password', md5(req.body.password));
      let userId = "";

      if(login_data.length != 0){
        res.cookie('UUID', req.body.username, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true
        });
        res.redirect('/');
        return;
      }

      res.render('login', {userId: userId, error: true});
    } catch(err){
      res.send({ success: false, message: err})
    }
  },
  signup: async (req, res) => {
    try{
      const signup_data = await db.select('*').from('users').where('id', req.body.username);
      const tel_signup_data = await db.select('*').from('users').where('id', req.body.tel);
      let userId = "";
      
      if(signup_data.length != 0 || tel_signup_data != 0){
        res.render('sign_up', {userId: userId, error: true})
        return;
      }
      
      await db.insert({
        id: req.body.username,
        password: md5(req.body.password),
        phone: req.body.tel
      }).into('users')

      res.redirect('/')

    } catch(err){
      res.send({ success: false, message: err})
    }
  }
}

module.exports = {
  output,
  process
}
