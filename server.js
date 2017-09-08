const express = require('express');
const app = express();
const fs=require('fs');
const session = require('express-session');
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(require('./config/sessionStore'));



//charger les Ctrl 
const commentsCtrl=require('./app/controller/commentsCtrl');
const articlesCtrl=require('./app/controller/articlesCtrl');


// view engine
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie:{secure:false}
}));
app.use(require('./core/middlewares/flash'))


//router
app.get('/',(request,response)=>{
    response.redirect('/1');
});
app.get('/:page',articlesCtrl.home);
app.get('/category=:cat=:id/:page',articlesCtrl.byCategorie);
app.get('/search/:page/',articlesCtrl.search);
app.get('/category=:categorie/post=:titre/:id/',articlesCtrl.show);




//post requests
app.post('/category=:categorie/post=:titre/:id/commenting',commentsCtrl.create)


//server port default=80
app.listen(80);