const express = require('express');
const cookieParser = require('cookie-parser');
const bluebird = require('bluebird');
const cors = require('cors');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api'); // Custom

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const allowedOrigins = ['http://localhost:3000', 'http://181.26.241.38:3000','http://127.0.0.1:3000'];

app.use(
  cors({
    origin: function (origin, callback) {
      // Comprueba si el origen de la solicitud está en la lista de orígenes permitidos
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Acceso no permitido para este origen!'));
        console.log(origin);
      }
    },
    credentials: true,
  })
);

app.use('/api', apiRouter);
app.use('/', indexRouter);

if (process.env.NODE_ENV === 'Development') {
  require('./config').config();
}

const mongoose = require('mongoose');
mongoose.Promise = bluebird;
//const url = `${process.env.DATABASE1}${process.env.DATABASE2}=${process.env.DATABASE3}=${process.env.DATABASE4}`;
const url = `${process.env.URL_LOCAL}`;

const opts = {
  useNewUrlParser: true,
  connectTimeoutMS: 20000,
  useUnifiedTopology: true,
};

mongoose.connect(url, opts)
  .then(() => {
    console.log(`Conexión exitosa a la base de datos de MongoDB.`);
  })
  .catch((e) => {
    console.log(`Error al conectar a la base de datos de MongoDB...`);
    console.log(e);
  });

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', function () {
  console.log(`Express está escuchando en el puerto ${port}`);
});

module.exports = app;
