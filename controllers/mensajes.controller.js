var MensajeService = require('../services/mensajes.service');

exports.publicarMensaje = async function (req, res, next) {
    var Mensaje = {
        userid: req.body.userid,
        alumno: req.body.alumno,
        mensaje: req.body.mensaje,
    }
    try {
        
        var createdMensaje = await MensajeService.publicarMensaje(Mensaje);
       
        return res.status(201).json({createdMensaje, message: "Succesfully Created Mensaje"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Contract Creation was Unsuccesfull"})
    }
}

exports.borrarMensaje = async function (req, res, next) {
    
    try {
        var id = req.body.id;
        var deleted = await MensajeService.borrarMensaje(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.getMensajes = async function (req, res, next) {
    
    try {
        var id = req.query.id
        var Mensajes = await MensajeService.getMensajes(id)
        return res.status(200).json({status: 200, data: Mensajes, message: "Succesfully Contratos Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}