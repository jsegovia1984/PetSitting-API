var Servicio = require('../models/servicios');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

_this = this

exports.publicarServicio = async function (servicio,urlImg) {
    console.log(10)
    var newServicio = new Servicio({
        userid: servicio.userid,
        titulo: servicio.titulo,
        descripcion: servicio.descripcion,
        categoria: servicio.categoria,
        frecuencia: servicio.frecuencia,
        duracion: servicio.duracion,
        tipo: servicio.tipo,
        costo: servicio.costo,
        rating : 0,
        estado : servicio.estado,
        comentarios: 0,
        imagen: urlImg,
        total: 0,
    })

    try {
        console.log(11)
        var savedServicio = await newServicio.save();
        var token = jwt.sign({
            id: savedServicio._id,
            imagen: savedServicio.imagen
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
      
        console.log(e)    
        throw Error("Error while Creating Servicio")
    }

}

exports.borrarServicio = async function (id) {
    try {
        var deleted = await Servicio.remove({
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

exports.modificarServicio = async function (servicio,urlImg) {

    var id = {_id: servicio.id}
    try {
        var oldServicio = await Servicio.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    if (!oldServicio) {
        return false;
    }
    oldServicio.titulo = servicio.titulo;
    oldServicio.descripcion = servicio.descripcion;
    oldServicio.categoria = servicio.categoria;
    oldServicio.frecuencia = servicio.frecuencia;
    oldServicio.duracion = servicio.duracion;
    oldServicio.tipo = servicio.tipo;
    oldServicio.costo = servicio.costo;
    oldServicio.estado = servicio.estado;

    if (urlImg != 0){
        oldServicio.imagen = urlImg;
    }
    
    try {
        var savedUser = await oldServicio.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.getServiciosGenerales = async function (servicio) {
    console.log(servicio);
    var Servicios;
    try {
        if (servicio!=0){
                var conditions = [];
                if (servicio.id) {
                    conditions.push({ _id: servicio.id });
                }
                if (servicio.categoria) {
                    conditions.push({ categoria: servicio.categoria });
                }
                if (servicio.frecuencia) {
                    conditions.push({ frecuencia: servicio.frecuencia });
                }
                if (servicio.tipo) {
                    conditions.push({ tipo: servicio.tipo });
                }
                if (servicio.rating) {
                    const ratingValue = parseFloat(servicio.rating);
                    conditions.push({ rating: { $gte: ratingValue, $lt: ratingValue + 1 - 0.01 } });
                }                
                var Servicios = await Servicio.find({
                    $and: conditions
                });

        } else{
            Servicios = await Servicio.find();
        }
        
          
        return Servicios;
    } catch (e) {
        throw Error('Error while getting Servicios');
    }
}

exports.getServiciosDashboard = async function (id) {
    try {
        var Servicios = await Servicio.find({userid:id})
        return Servicios;
    } catch (e) {
        throw Error('Error while getting Servicios');
    }
}

exports.actualizarRating = async function (id,rating) {
    console.log('hola');
    try {
        var oldServicio = await Servicio.findOne({_id:id});
        console.log(oldServicio);
        oldServicio.comentarios += 1;
        oldServicio.total+=rating;
        oldServicio.rating = (oldServicio.total/oldServicio.comentarios);
        var savedServicio = await oldServicio.save();
        return savedServicio;
    } catch (e) {
        throw Error('Error while getting Servicios');
    }
}