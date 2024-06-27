
const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({

  userid: {
    type: String,
    trim: true,
    required: true
  },
  titulo: {
    type: String,
    trim: true,
    required: true
  },
  descripcion: {
    type: String,
    trim: true,
    required: true
  },
  categoria: {
    type: String,
    trim: true,
    required: true,
    enum:["Cuidado Diario y Paseo","Alojamiento y Hospedaje","Entrenamiento y Comportamiento","Salud y Bienestar","Aseo y Estética","Nutrición y Dietética","Recreación y Ejercicio"," Transporte y Logística","Otros"]
    
  },
  frecuencia: {
    type: String,
    trim: true,
    required: true,
    enum:["Única","Semanal","Mensual"]
  },
  duracion: {
    type: String,
    trim: true,
    required: true,
    enum:["30 Minutos","1 Hora","2 Horas","3 Horas","4 Horas"]
  },
  tipo: {
    type: String,
    trim: true,
    required: true,
    enum:["Individual","Grupal"]
  },
  costo: {
    type: String,
    trim: true,
    required: true
  },
  rating: {
    type: Number,
    trim: true,
    required: true
  },
  estado:{
    type: String,
    trim: true,
    required: true,
    enum:["Pausado","Publicado"]
  },
  imagen: {
    type: String,
    required: true
  },
  comentarios: {
    type: Number,
    trim: true,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
});

const Servicio = mongoose.model('Servicio', servicioSchema);

module.exports = Servicio;
