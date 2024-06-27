var Comentario = require('../models/comentarios');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

_this = this

exports.publicarComentario = async function (comentario) {
    var newComentario = new Comentario({
        serviceid: comentario.serviceid,
        nombreservicio: comentario.nombreservicio,
        alumno: comentario.alumno,
        texto: comentario.texto,
        titulo: comentario.titulo,
        calificacion: comentario.calificacion,
        estado: comentario.estado,
        fecha: new Date(),
        userid: comentario.userid,
    })

    try {
        var savedComentario = await newComentario.save();
        var token = jwt.sign({
            id: savedComentario._id,
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
      
        console.log(e)    
        throw Error("Error while Creating User")
    }
}

exports.borrarComentario = async function (id) {
    try {
        var deleted = await Comentario.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Comentario Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Comentario")
    }
}

exports.modificarComentario = async function (comentario) {
    var id = {_id : comentario.id}

    try {
        var oldComentario = await Comentario.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    
    if (!oldComentario) {
        return false;
    }
    
    oldComentario.estado = comentario.estado

    try {
        var savedComentario = await oldComentario.save()
        return savedComentario;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }

}

exports.getComentariosPublicacion = async function (id) {
    
    try {
        var Comentarios = await Comentario.find({serviceid:id})
        return Comentarios;
    } catch (e) {
        throw Error('Error while getting Comentarios');
    }

}

exports.getComentariosDashboard = async function (id) {
    try {
        var Comentarios = await Comentario.find({userid:id})
        return Comentarios;
    } catch (e) {
        throw Error('Error while getting Comentarios');
    }
}
