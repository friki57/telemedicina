module.exports = (passport)=>
{
  var bcrypt = require('bcryptjs');

  var bd = require('./../BD/bd.js');
  bd.iniciar();

    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user,done)=>
    {
    //  console.log("serializando usuario",user);
      done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
      bd.cruds.crudUsuario.buscarUno(id,(usuario)=>
      {
        //console.log('desserializando', usuario);
        if((usuario!=undefined))
        {
          done(null, usuario);
        }
        else
        {
          done(null, false);
          console.log("no hay este usuario");
        }
      });
    });
    passport.use("registrarse", new LocalStrategy({
      usernameField: 'correo',
      passwordField: 'contra',
      passReqToCallback: true
    },(req,correo,contra,done)=>
    {
      bd.cruds.crudUsuario.buscar({correo:{tipo: 'igual',valor: correo}},(res)=>
      {
        if(res.length>0)
        {
          return done(null, false);
        }
        else
        {
          bd.cruds.crudUsuario.buscar({correo:{tipo: 'igual',valor: correo}}, (usuario)=>{
          console.log(usuario);
          if((usuario.length>0)){
            return done(null, false);
          }
          else
          {
            req.body.tipo = "Paciente"
            console.log("Usuario:",req.body);
            console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
            const confirmacion = require('./../../Controlador/correo.js');
            var hash = confirmacion(correo,bd,res);
            req.body.hash = hash;
            bd.cruds.crudUsuario.ingresar(req.body,(resp)=>
            {
              return done(null, resp);
            })
          }
          });
        }
      });
    }));

    passport.use('iniciar sesion', new LocalStrategy({
       usernameField : 'correo',
       passwordField: 'contra',
       passReqToCallback: true
     }, (req, correo, contra, done)=> {
       bd.cruds.crudUsuario.buscar({correo:{tipo: 'igual',valor: correo}}, (usuario)=>{
         console.log(usuario);
        if((usuario.length<=0)){
         return done(null, false);
        }
        else
        {
          console.log('contra:',contra, usuario[0].contra)
          if(contra==usuario[0].contra)
          {
            req.session.usuario = usuario[0];
            return done(null, usuario[0]);
          }
          else
          {
            return done(null, false);
          }
        }
       });
      })
    );


}
