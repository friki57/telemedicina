const path = require("path");
const express = require('express');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
var app = express();
var MongoDBStore = require('connect-mongodb-session')(session);


const server = require('http').Server(app);
const io = require('socket.io')(server);
const {ExpressPeerServer} = require('peer')
const peer = ExpressPeerServer(server , {
  debug:true
});
app.use('/peerjs', peer);

require('./Modelo/Autenticacion/local.js')(passport);

var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/telemedicina',
  collection: 'mySessions'
});

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  rolling: true,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 'COOKIE_TIMEOUT',
    maxAge: 1000 * 60 * 60 *24 * 365
  },
  maxAge: 1000 * 60 * 60 *24 * 365,
  store: store,
  resave: false,
  saveUninitialized: false
}));
mongoose.connect('mongodb://localhost/telemedicina')
.then(db => console.log('db connected'))
.catch(err => console.log(err));

var puerto = process.env.PORT || "4000";

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"/public")));
app.use(bodyParser.json());
app.use(cookieParser());

app.set("views", path.join(__dirname, "Vista/ejs"));
app.set("view engine", "ejs");

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.confirm = req.flash("confirmacion");
  app.locals.error = req.flash("error");
  next();
});

var rutas = require('./Controlador/HTTP/index.js');
app.use(rutas(passport));


io.on("connection" , (socket)=>{
  socket.on('newUser' , (id , room)=>{
    console.log("rooM:",room,"id:", id);
    socket.join(room);
    socket.to(room).broadcast.emit('userJoined' , id);
    socket.on('disconnect' , ()=>{
        socket.to(room).broadcast.emit('userDisconnect' , id);
    })
  })
})

//app.listen(puerto, '104.225.141.251', ()=>
server.listen(puerto, ()=>
{
  console.log("Servidor lanzado en el puerto:",puerto);
  // const bd = require('./Modelo/BD/conexion');
  // var ref = bd.ref('calle');
  // ref.on('value', (data)=> {console.log(data.val());}
  //   , (err)=> {console.log(err);console.log("error")});

});
