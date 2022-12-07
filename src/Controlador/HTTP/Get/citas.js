
module.exports = (rutas, bd, ver, datos, http)=>
{
  rutas.get(http.get.verSolicitudesCitas,(req,res)=>
  {
    datos.usuario = req.user;
    bd.cruds.crudCita.buscarTodo((citas)=>
    {
      citas = citas.filter(a=>a.idDoctor == req.user._id)
      citas = citas.filter(a=>a.estado == "pendiente")
      bd.cruds.crudUsuario.buscarTodo((usuarios)=>
      {
        bd.cruds.crudCentro.buscarTodo(centros=>
        {
          datos.citas = citas.map(a=>{
            a = a.toObject();
            var adminPosta = usuarios.find(b=>b._id==a.idAdminCentro);
            var posta = centros.find(b=>b._id==adminPosta.idCentro);
            a.adminPosta = adminPosta.nombres + " " + adminPosta.apellidos;
            if(posta != undefined)
              a.posta = posta.nombre;
            return a;
          }).reverse();
          res.render(http.vista.verSolicitudesCitas,{datos});
        })
      })
    })
  });
  rutas.get(http.get.verHistorialCitas,(req,res)=>
  {
    datos.usuario = req.user;
    datos.tipo = "posta"
    bd.cruds.crudCita.buscarTodo((citas)=>
    {
      citas = citas.filter(a=>a.idAdminCentro == req.user._id)
      bd.cruds.crudUsuario.buscarTodo((usuarios)=>
      {
        datos.citas = citas.map(a=>{
          a = a.toObject();
          var doc = usuarios.find(b=>b._id==a.idDoctor);
          a.doctor = doc;
          return a;
        }).reverse();
        res.render(http.vista.verHistorialCitas,{datos});
      })
    })
  });
  rutas.get(http.get.paciente + "/:id",(req,res)=>
  {
    var id = req.params.id;
    datos.tipo = "paciente"
    bd.cruds.crudCita.buscarTodo((citas)=>
    {
      citas = citas.filter(a=>a.idAdminCentro == id)
      bd.cruds.crudUsuario.buscarTodo((usuarios)=>
      {
        datos.citas = citas.map(a=>{
          a = a.toObject();
          var doc = usuarios.find(b=>b._id==a.idDoctor);
          a.doctor = doc;
          a.paciente = id
          return a;
        }).reverse();
        console.log(datos.citas)
        res.render(http.vista.paciente,{datos});
      })
    })
  });
  rutas.get(http.get.verHistorialCitasDoctor,(req,res)=>
  {
    datos.usuario = req.user;
    datos.tipo = "doctor"
    bd.cruds.crudCita.buscarTodo((citas)=>
    {
      citas = citas.filter(a=>a.idDoctor == req.user._id)
      bd.cruds.crudUsuario.buscarTodo((usuarios)=>
      {
        bd.cruds.crudCentro.buscarTodo(centros=>
        {
          datos.citas = citas.map(a=>{
            a = a.toObject();
            var adminPosta = usuarios.find(b=>b._id==a.idAdminCentro);
            var posta = {}
            if(adminPosta != undefined)
              posta = centros.find(b=>b._id==adminPosta.idCentro);
            a.adminPosta = adminPosta;
            if(posta != undefined)
              a.posta = posta.nombre;
            return a;
          }).reverse();
          console.log(datos.citas)
          res.render(http.vista.verHistorialCitas,{datos});
        })
      })
    })
  });
  rutas.get(http.get.hacerCita + "/:id",(req,res)=>
  {
    var id = req.params.id;
    datos.usuario = req.user;
    bd.cruds.crudUsuario.buscarUno(id,(doctor)=>
    {
      datos.doctor = doctor;
      bd.cruds.crudCentro.buscarUno(datos.usuario.idCentro,(centro)=>
      {
        if(datos.usuario.tipo != "Paciente")
          datos.centro = centro.nombre;
        res.render(http.vista.hacerCita,{datos});
      })
    });
  });
  rutas.get(http.get.videollamada + "/:id",(req,res)=>
  {
    var id = req.params.id;
    console.log(id);
    if(id!="index.js")
    {
      datos.usuario = req.user;
      bd.cruds.crudCita.buscarTodo((citas)=>
      {
        var cita = citas.filter(a=>{
          if(a._id == id) return a;
        })[0];
        bd.cruds.crudUsuario.buscarUno(cita.idAdminCentro,(adminPosta)=>
        {
          bd.cruds.crudUsuario.buscarUno(cita.idDoctor, (doctor)=>
          {
            if(adminPosta==undefined) adminPosta={}
            bd.cruds.crudCentro.buscarUno(adminPosta.idCentro, (centro)=>
            {
              datos.cita = cita;
              datos.cita.adminPosta = adminPosta;
              datos.cita.doctor = doctor;
              datos.cita.posta = centro;
              res.render(http.vista.videollamada,{datos});
            })
          });
        })
      })

    }
    else {
      res.send(200);
    }

  });
  rutas.get(http.get.diagnostico + "/:id",(req,res)=>
  {
    if(req.user.tipo != "doctor")
      res.redirect(http.get.verHistorialCitas);
    else
    {
      
      var id = req.params.id;
      console.log(id);
      if (id != "index.js") {
        datos.usuario = req.user;
        bd.cruds.crudCita.buscarTodo((citas) => {
          var cita = citas.filter((a) => {
            if (a._id == id) return a;
          })[0];
          bd.cruds.crudUsuario.buscarUno(cita.idAdminCentro, (adminPosta) => {
            bd.cruds.crudUsuario.buscarUno(cita.idDoctor, (doctor) => {
              if(adminPosta==undefined) adminPosta={}
              
              bd.cruds.crudCentro.buscarUno(adminPosta.idCentro, (centro) => {
                datos.cita = cita;
                datos.cita.adminPosta = adminPosta;
                datos.cita.doctor = doctor;
                datos.cita.posta = centro;
                res.render(http.vista.diagnostico, { datos });
              });
            });
          });
        });
      } else {
        res.send(200);
      }
    }
  });
}
