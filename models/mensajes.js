
const mongoose = require('mongoose');

const MensajeSchema = new mongoose.Schema({

  userid: {
    type: String,
    required: true,
    trim: true,
  },
  alumno: {
    type: String,
    required: true,
    trim: true,
  },
  mensaje: {
    type: String,
    required: true,
    trim: true,
  },

});

const mensaje = mongoose.model('Mensaje', MensajeSchema);

module.exports = mensaje;