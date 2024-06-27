
const mongoose = require('mongoose');

var ComentarioSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    trim: true,
  },
  serviceid: {
    type: String,
    required: true,
    trim: true,
  },
  nombreservicio: {
    type: String,
    required: true,
    trim: true,
  },
  alumno: {
    type: String,
    required: true,
    trim: true,
  },
  texto: {
    type: String,
    required: true,
    trim: true,
  },
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  calificacion: {
    type: Number,
    required: true,
    trim: true,
    min: 1,
    max: 5, 
  },
  estado: {
    type: String,
    required: true,
    trim: true,
    enum:["Aceptado","Rechazado","Pendiente"]
  },
  fecha: {
    type: String,
    required: true,
    trim: true,
  },

})

// Crear el modelo de comentarios
const Comentario = mongoose.model('Comentario', ComentarioSchema);

module.exports = Comentario;
