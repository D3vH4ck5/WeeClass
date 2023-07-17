const knex = require('knex')
const md5 = require('md5')
const cookie = require('cookie')
const db_config = require('../../../db_config.json');
// const http = require("http").Server(app);
// const io = require("socket.io")(http);

const db = knex({
  client: 'mysql',
  connection: {
    host: 'fxgnmo.cafe24app.com',
    port: 3306,
    user: db_config.DB_USERNAME,
    password: db_config.DB_PASSWORD,
    database: db_config.DB_NAME,
    dateStrings: 'date',
  }
})

let namespaces = {};

const output = {
  index: async (req, res) => {
    let cookies = {};
    let userId = "";
    let isAdmin = "";
    if(req.headers.cookie !== undefined){
      cookies = cookie.parse(req.headers.cookie);
    }

    if(cookies.UUID !== undefined){
      userId = cookies.UUID;
    }

    function addZero(date) {
        if (date < 10) {
            const zeroDate = ('00' + date).slice(-2);
            return zeroDate;
        }
        return date;
    }
    
    const tt = new Date().getFullYear() + '-' + addZero(new Date().getMonth()+1) + '-' + addZero(new Date().getDate());

    const check_data = await db.select('*').from('users').where('id', userId);

    const timesclass = [];

    for(let i = 1; i <= 7; i++){
      const contt = await db.select('*').from('consultations').where('uploaddate', tt).where('classtime', i);
      if(contt.length != 0){
        if(contt[0].statusinfo == "ok"){
          timesclass.push("상담");
        } else if(contt[0].statusinfo == "no"){
          timesclass.push("없음");
        } else{
          timesclass.push("상담 신청됨");
        }
      } 
      else timesclass.push("신청하기");
    }
    
    //const contt = await db.select('*').from('consultations').where('uploaddate', tt);
    
    if(check_data.length != 0){
      isAdmin = check_data[0].isAdmin;
      res.render('weeclass/index', {userId: userId, consulatations: timesclass, times: tt, isAdmin: isAdmin})
      return;
    } 

    userId = "";
    res.render('weeclass/index', {userId: userId, isAdmin: isAdmin, times: tt, consulatations: timesclass})
  },
  login: async (req, res) => {
    let cookies = {};
    let userId = "";
    let isAdmin = "";

    if(req.headers.cookie !== undefined){
      cookies = cookie.parse(req.headers.cookie);
    }

    if(cookies.UUID !== undefined){
      const check_data = await db.select('*').from('users').where('id', cookies.UUID);

      if(check_data.length != 0){
        res.redirect('/weeclass');
        return;
      } 

      userId = "";
      res.render('weeclass/login', {userId: userId, isAdmin: isAdmin, error: false})
      return;
    }

    res.render('weeclass/login', {userId: userId, isAdmin: isAdmin, error: false})
    
  },
  signup: async (req, res) => {
    let cookies = {};
    let userId = "";
    let isAdmin = "";
    
    if(req.headers.cookie !== undefined){
      cookies = cookie.parse(req.headers.cookie);
    }

    if(cookies.UUID !== undefined){
      const check_data = await db.select('*').from('users').where('id', cookies.UUID);
      
      if(check_data.length != 0){
        res.redirect('/weeclass');
        return;
      } 

      userId = "";
      res.render('weeclass/sign_up', {userId: userId, isAdmin: isAdmin, error: false})
      return;
    }

    res.render('weeclass/sign_up', {userId: userId, isAdmin: isAdmin, error: false})
  },
  logout: (req, res) => {
    res.clearCookie('UUID');
    res.redirect('/weeclass');
  },
  sangdam: async (req, res) => {
    let cookies = {};
    let userId = "";
    let isAdmin = "";

    if(req.headers.cookie !== undefined){
      cookies = cookie.parse(req.headers.cookie);
    }

    if(cookies.UUID !== undefined){
      const check_data = await db.select('*').from('users').where('id', cookies.UUID);

      if(check_data.length != 0){
        isAdmin = check_data[0].isAdmin;
        userId = cookies.UUID;
        res.render('weeclass/sangdamIn', {userId: userId, isAdmin: isAdmin, error: false})
        return;
      } 

      userId = "";
      res.redirect('/weeclass/login');
      return;
    }

    res.redirect('/weeclass/login');
  },
  my_page: async (req, res) => {
    let cookies = {};
    let userId = "";
    let isAdmin = "";

    if(req.headers.cookie !== undefined){
      cookies = cookie.parse(req.headers.cookie);
    }

    if(cookies.UUID !== undefined){
      const check_data = await db.select('*').from('users').where('id', cookies.UUID);
      if(check_data.length != 0){
        isAdmin = check_data[0].isAdmin;
        userId = cookies.UUID;
        const ss_data = await db.select('*').from('consultations').where('id', userId).orderBy('uploaddate', 'desc')
        res.render('weeclass/myprofile', {userId: userId, isAdmin: isAdmin, username: check_data[0].name, classnum: check_data[0].class, phone: check_data[0].phone, contects: ss_data})
        return;
      } 

      userId = "";
      res.redirect('/weeclass');
      return;
    }

    res.redirect('/weeclass');
  },
  rules: async (req, res) => {
    let cookies = {};
    let userId = "";
    let isAdmin = "";

    if(req.headers.cookie !== undefined){
      cookies = cookie.parse(req.headers.cookie);
    }

    if(cookies.UUID !== undefined){
      userId = cookies.UUID;
    }

    const check_data = await db.select('*').from('users').where('id', userId);

    if(check_data.length != 0){
      isAdmin = check_data[0].isAdmin;
      res.render('weeclass/rules', {userId: userId, isAdmin: isAdmin})
      return;
    } 

    userId = "";
    res.render('weeclass/rules', {userId: userId, isAdmin: isAdmin})
  },
  admin: async (req, res) => {
    let cookies = {};
    let userId = "";
    let isAdmin = "";

    if(req.headers.cookie !== undefined){
      cookies = cookie.parse(req.headers.cookie);
    }

    function addZero(date) {
        if (date < 10) {
            const zeroDate = ('00' + date).slice(-2);
            return zeroDate;
        }
        return date;
    }
    
    const tt = new Date().getFullYear() + '-' + addZero(new Date().getMonth()+1) + '-' + addZero(new Date().getDate());


    if(cookies.UUID !== undefined){
      const check_data = await db.select('*').from('users').where('id', cookies.UUID);
      if(check_data.length != 0){
        isAdmin = check_data[0].isAdmin;
        userId = cookies.UUID;

        const seach = await db.select('*').from('consultations').where('statusinfo', 'ok');
        const all = await db.select('*').from('consultations');

        
        
        res.render('weeclass/admin', {userId: userId, isAdmin: isAdmin, times: tt, al: all.length, nal: all.length-seach.length})
        return;
      } 

      userId = "";
      res.redirect('/weeclass');
      return;
    }

    res.redirect('/weeclass');
  },
  onlinesangdam: async (req, res) => {
    let cookies = {};
    let userId = "";
    let isAdmin = "";

    if(req.headers.cookie !== undefined){
      cookies = cookie.parse(req.headers.cookie);
    }

    if(cookies.UUID !== undefined){
      const check_data = await db.select('*').from('users').where('id', cookies.UUID);
      if(check_data.length != 0){
        isAdmin = check_data[0].isAdmin;
        userId = cookies.UUID;

        
        
        res.render('weeclass/chat', {userId: userId, isAdmin: isAdmin})
        return;
      } 

      userId = "";
      res.redirect('/weeclass/login');
      return;
    }

    res.redirect('/weeclass/login');
  }
}

const process = {
  login: async (req, res) => {
    try{
      const login_data = await db.select('*').from('users').where('id', req.body.username).where('user_password', md5(req.body.password));
      let userId = "";
      let isAdmin = "";
      
      if(login_data.length != 0){
        res.cookie('UUID', req.body.username, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true
        });
        res.redirect('/weeclass');
        return;
      }

      res.render('weeclass/login', {userId: userId, isAdmin: isAdmin, error: true});
    } catch(err){
      res.send({ success: false, message: err})
    }
  },
  signup: async (req, res) => {
    try{
      const signup_data = await db.select('*').from('users').where('id', req.body.username);
      const tel_signup_data = await db.select('*').from('users').where('phone', req.body.tel);
      let userId = "";
      let isAdmin = "";
      
      if(signup_data.length != 0 || tel_signup_data != 0){
        res.render('weeclass/sign_up', {userId: userId, isAdmin: isAdmin, error: true})
        return;
      }
      
      await db.insert({
        id: req.body.username,
        user_password: md5(req.body.password),
        phone: req.body.tel,
        class: req.body.classnum,
        name: req.body.realname
      }).into('users')

      res.redirect('/weeclass')

    } catch(err){
      res.send({ success: false, message: err})
    }
  },
  sangdam: async (req, res) => {
    try{
      let cookies = {};
      let userId = "";
      let isAdmin = "";
      
      if(req.headers.cookie !== undefined){
        cookies = cookie.parse(req.headers.cookie);
      }

      if(cookies.UUID !== undefined){
        userId = cookies.UUID;
      }


      const data = await db.select('*').from('users').where('id', userId)
      const list_data = await db.select('*').from('consultations')
      const add_data = await db.select('*').from('consultations').where('uploaddate', req.body.sangdam_date).where('classtime', req.body.sangdam_time);
      
      
      if(add_data.length != 0){
        isAdmin = data[0].isAdmin;
        res.render('weeclass/sangdamIn', {userId: userId, isAdmin: isAdmin, error: true});
        return;
      }else{
        await db.insert({
          idx: (list_data.length + 1),
          id: data[0].id,
          name: data[0].name,
          class: data[0].class,
          classtime: req.body.sangdam_time,
          contact: req.body.contect,
          uploaddate: req.body.sangdam_date,
          statusinfo: " "
        }).into('consultations')

        res.redirect('/weeclass')
      }


    } catch(err){
      res.send({success: false, message: err})
    }
  }
}

module.exports = {
  output,
  process
}
