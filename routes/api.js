/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var comentarios = require('./api/comentarios.route')
var contratos = require('./api/contratos.route')
var mensajes = require('./api/mensajes.route')
var servicios = require('./api/servicios.route')

router.use('/users', users);
router.use('/comentarios', comentarios);
router.use('/contratos', contratos);
router.use('/mensajes', mensajes);
router.use('/servicios', servicios);

module.exports = router;
