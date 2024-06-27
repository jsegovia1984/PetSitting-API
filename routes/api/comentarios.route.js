var express = require('express')
var router = express.Router()
var ComentarioController = require('../../controllers/comentarios.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/comentarios.routes');
  });
router.post('/publicar', ComentarioController.publicarComentario)
router.delete('/borrar',Authorization, ComentarioController.borrarComentario)
router.put('/modificar', Authorization,ComentarioController.modificarComentario)
router.get('/publicacion', ComentarioController.getComentariosPublicacion)
router.get('/dashboard', Authorization, ComentarioController.getComentariosDashboard)



// Export the Router
module.exports = router;


