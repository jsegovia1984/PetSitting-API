var Mensaje = require('../models/mensajes');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

_this = this

exports.publicarMensaje = async function (mensaje) {
    var newMensaje = new Mensaje({
        userid: mensaje.userid,
        alumno: mensaje.alumno,
        mensaje: mensaje.mensaje,
    })

    try {
        var savedMensaje = await newMensaje.save();
        var token = jwt.sign({
            id: savedMensaje._id,
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
      
        console.log(e)    
        throw Error("Error while Creating Mensaje")
    }

}

exports.borrarMensaje = async function (id) {
    try {
        var deleted = await Mensaje.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Mensaje Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Mensaje")
    }

}

exports.getMensajes = async function (id) {
    try {
        var Mensajes = await Mensaje.find({userid:id})
        return Mensajes;
    } catch (e) {
        throw Error('Error while getting Mensajes');
    }

}