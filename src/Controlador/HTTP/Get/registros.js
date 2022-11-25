
module.exports = (rutas, bd, ver, datos, http)=>
{
  rutas.get("/",(req,res)=>
  {
    res.render("bienvenida", {datos})
  })
  rutas.get(http.get.rutaInformacion.inicio, (req,res)=>
  {
    if(req.isAuthenticated())
    {
      datos.usuario = req.user;
      res.redirect(datos.http.get.cuenta);
    }
    else
    {
      datos.usuario = undefined;
      res.render('inicio',{datos});
    }
  });
  rutas.get(http.get.cerrarSesion,(req,res)=>
  {
    req.logout();
    req.session.destroy();
    datos.usuario = undefined;
    res.redirect("/");
  });
  rutas.get(http.get.registrarHospital,(req,res)=>
  {
    datos.usuario = req.user;
    res.render(http.vista.registrarHospital,{datos});
  });
  rutas.get(http.get.registrarEspecialidad,(req,res)=>
  {
    datos.usuario = req.user;
    res.render(http.vista.registrarEspecialidad,{datos});
  });
  rutas.get(http.get.verificar,(req,res)=>
  {
    datos.usuario = req.user;
    res.render(http.vista.verificar,{datos});
  });
  rutas.get(http.get.registrarDoctor,(req,res)=>
  {
    datos.usuario = req.user;
    res.render(http.vista.registrarDoctor,{datos});
  });
  rutas.get(http.get.registrarPaciente,(req,res)=>
  {
    datos.usuario = req.user;
    res.render(http.vista.registrarPaciente,{datos});
  });
  rutas.get(http.get.registrarse,(req,res)=>
  {
    datos.usuario = req.user;
    res.render(http.vista.registrarse,{datos});
  });
  rutas.get(http.get.cuenta, ver["verificado"],(req,res)=>
  {
    console.log("-----------------------------------");
    datos.usuario = req.user;
    bd.cruds.crudEspecialidad.buscarTodo(especialidades=>
    {
      bd.cruds.crudCentro.buscarUno(req.user.idCentro, (centro)=>
      {
        if(centro!=undefined)
          datos.centroNombre = centro.nombre;
        else datos.centroNombre = "";
        if(datos.usuario.tipo == "doctor")
        {
          datos.especialidades = especialidades.filter(a=>!datos.usuario.doctor.idEspecialidad.includes(a._id));
          datos.espDoctor = especialidades.filter(a=>datos.usuario.doctor.idEspecialidad.includes(a._id))
          datos.espDoctortxt = datos.espDoctor.map(a=>a.nombre).join(", ");
        }
        console.log(datos.especialidades);
        res.render(http.vista.cuenta,{datos});
      })
    })
  });
  rutas.get(http.get.registrarAdminPosta,(req,res)=>
  {
    datos.usuario = req.user;
    bd.cruds.crudCentro.buscarTodo((centros)=>
    {
      datos.centros = centros;
      res.render(http.vista.registrarAdminPosta,{datos});
    })
  });

}
