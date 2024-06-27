var ComentarioService = require('../services/comentarios.service');
var ServicioService = require('../services/servicios.service');

exports.publicarComentario = async function (req, res, next) {

    var Comentario = {
        serviceid: req.body.serviceid,
        nombreservicio: req.body.nombreservicio,
        alumno: req.body.alumno,
        texto: req.body.texto,
        titulo: req.body.titulo,
        calificacion: req.body.calificacion,
        estado: req.body.estado,
        userid: req.body.userid,
    }
    try {

        var createdComentario = await ComentarioService.publicarComentario(Comentario);


        var rating = parseInt(req.body.calificacion); 
        await ServicioService.actualizarRating(Comentario.serviceid, rating);


        return res.status(201).json({createdComentario, message: "Succesfully Created Comment"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Comment Creation was Unsuccesfull"})
    }

}

exports.borrarComentario = async function (req, res, next) {
   
    try {
        var id = req.body.id;
        var deleted = await ComentarioService.borrarComentario(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.modificarComentario = async function (req, res, next) {
    if (!req.body.id) {
        return res.status(400).json({status: 400., message: "Id be present"})
    }
    if (!req.body.estado) {
        return res.status(400).json({status: 400., message: "Estado be present"})
    }

    var Comentario = {
        id: req.body.id ? req.body.id : null,
        estado: req.body.estado ? req.body.estado : null
    }

    try {
        var updatedComentario = await ComentarioService.modificarComentario(Comentario)
        return res.status(200).json({status: 200, data: updatedComentario, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}



exports.getComentariosPublicacion = async function (req, res, next) {
    
    
    try {
        var id = req.query.id
        var Comentarios = await ComentarioService.getComentariosPublicacion(id)
        return res.status(200).json({status: 200, data: Comentarios, message: "Succesfully Comentarios Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getComentariosDashboard = async function (req, res, next) {
    
    try {
        var id = req.query.id
        var Comentarios = await ComentarioService.getComentariosDashboard(id)
        return res.status(200).json({status: 200, data: Comentarios, message: "Succesfully Comentarios Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}
