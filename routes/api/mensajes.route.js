var express = require('express')
var router = express.Router()
var MensajesController = require('../../controllers/mensajes.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/mensajes.routes');
  });
router.post('/publicar', MensajesController.publicarMensaje)
router.delete('/borrar',Authorization, MensajesController.borrarMensaje)
router.get('/get', Authorization,MensajesController.getMensajes)



// Export the Router
module.exports = router;