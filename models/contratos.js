
const mongoose = require('mongoose');

const contratoSchema = new mongoose.Schema({

  userid: {
    type: String,
    trim: true,
    required: true
  },
  alumno: {
    type: String,
    trim: true,
    required: true,
  },
  servicio: {
    type: String,
    trim: true,
    required: true,
  },
  telefono: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  horario: {
    type: String,
    trim: true,
    required: true,
  },
  estado: {
    type: String,
    trim: true,
    required: true,
    enum: ["Cancelada","Finalizada","Aceptada","Pendiente"]
  },
});

const Contrato = mongoose.model('Contrato', contratoSchema);

module.exports = Contrato;
