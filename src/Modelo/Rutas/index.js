var json = {
  get: {
    inicio: "/",
    registrarHospital: "/Registrar/Hospital",
    registrarDoctor: "/Registrar/Doctor",
    cuenta: "/Cuenta",
    cerrarSesion: "/Cerrar/Sesion",
    verSolicitudesCitas: "/Ver/Citas",
    verHistorialCitas: "/Historial/Citas",
    verHistorialCitasDoctor: "/Historial/Citas/Doctor",
    buscarEspecialidad: "/Buscar/Doctor/Especialidad",
    hacerCita: "/Agregar/Cita",
    registrarAdminPosta: "/Registrar/AdminPosta",
    registrarEspecialidad: "/Especialidad/Registrar",
    videollamada: "/VideoLlamada/Cita",
    registrarPaciente: "/Registrar/Paciente",
    registrarse: "/Registrarse",
    verificar: "/Verificar",
    diagnostico: "/Diagnostico",
    paciente: "/Paciente/Perfil",
    contra: "/Paciente/RecuperarContra",
    cambiarContra: "/CambiarContra"
  },
  post: {
    prueba: "prueba",
    registrarHospital: "/Registrar/Hospital",
    registrarDoctor: "/Registrar/Doctor",
    cambiarEstado: "/Cambiar/Estado/Doctor",
    buscarEspecialidad: "/Buscar/Especialidad",
    enviarSolicitud: "/Enviar/Solicitud",
    rechazarSolicitud: "/Rechazar",
    aceptarSolicitud: "/Aceptar",
    registrarAdminPosta: "/Registrar/AdminPosta",
    añadirEspecialidad: "/Anadir/Especialidad",
    registrarEspecialidad: "/Especialidad/Registrar",
    registrarPaciente: "/Registrar/Paciente",
    registrarse: "/Registrarse",
    verificar: "/Verificar",
    diagnostico: "/Diagnostico",
    contra: "/contra",
    cambiarContra: "/cambiarContra",
  },
  vista: {
    inicio: "inicio",
    registrarHospital: "paginas/registros/registrarHospital",
    registrarDoctor: "paginas/registros/registrarDoctor",
    cuenta: "paginas/cuenta",
    verificar: "paginas/verificar",
    verSolicitudesCitas: "paginas/citas/solicitudes",
    verHistorialCitas: "paginas/citas/historial",
    buscarEspecialidad: "paginas/buscar/buscarEspecialidad",
    hacerCita: "paginas/citas/hacerCita",
    registrarAdminPosta: "paginas/registros/registrarAdminPosta",
    registrarEspecialidad: "paginas/registros/registrarEspecialidad",
    videollamada: "paginas/citas/videollamada",
    registrarPaciente: "paginas/registros/registrarPaciente",
    registrarse: "paginas/registros/registrarse",
    diagnostico: "paginas/citas/diagnostico",
    paciente: "paginas/citas/paciente",
    contra: "paginas/registros/contra",
    cambiarContra: "paginas/registros/cambiarContra"
  },
  ver: {},
};

var fs = require("fs");
var Rutas = fs.readdirSync("./src/Modelo/Rutas");
Rutas.map((ruta) => {
  if (ruta.toString().substr(0, 4) == "ruta") {
    var rut = require("./" + ruta);
    json.get[ruta.split(".")[0]] = rut.get;
    json.post[ruta.split(".")[0]] = rut.post;
    json.vista[ruta.split(".")[0]] = rut.vista;
    json.ver[ruta.split(".")[0]] = rut.ver;
  }
});

module.exports = json;
