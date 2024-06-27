var Contrato = require('../models/contratos');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

_this = this

exports.publicarContratacion = async function (contrato) {
    var newContrato = new Contrato({
        userid: contrato.userid,
        alumno: contrato.alumno,
        servicio: contrato.servicio,
        telefono: contrato.telefono,
        email: contrato.email,
        horario: contrato.horario,
        estado: contrato.estado,

    })

    try {
        console.log(1)
        var savedContrato = await newContrato.save();
        console.log(2)
        var token = jwt.sign({
            id: savedContrato._id,
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
      
        console.log(e)    
        throw Error("Error while Creating Contrato")
    }

}

exports.modificarContratacion = async function (contrato) {
    var id = {_id : contrato.id}

    try {
        var oldContrato = await Contrato.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Contrato")
    }
    
    if (!oldContrato) {
        return false;
    }
    
    oldContrato.estado = contrato.estado;

    try {
        var savedContrato = await oldContrato.save()
        return savedContrato;
    } catch (e) {
        throw Error("And Error occured while updating the Contrato");
    }

}

exports.borrarContratacion = async function (id) {
    try {
        var deleted = await Contrato.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Contrato Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Contrato")
    }

}

exports.getContrataciones = async function (id) {
    try {
        var Contratos = await Contrato.find({userid:id})
        return Contratos;
    } catch (e) {
        throw Error('Error while getting Contratos');
    }
}