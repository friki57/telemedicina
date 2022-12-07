const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citaSchema = Schema({
  idAdminCentro: String,
  idDoctor: String,
  fecha: String,
  hora: String,
  observacion: String,
  estado: String,
  temperatura: String,
  presion: String,
  diagnostico: String
});
module.exports = mongoose.model('cita', citaSchema);
