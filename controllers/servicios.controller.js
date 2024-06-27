var ServicioService = require('../services/servicios.service');
const CloudinaryService = require('../services/cloudinary');

exports.publicarServicio = async function (req, res, next) {
        
        var Servicio = {
            userid: req.body.userid,
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            categoria: req.body.categoria,
            frecuencia: req.body.frecuencia,
            duracion: req.body.duracion,
            tipo: req.body.tipo,
            costo: req.body.costo,
            rating: req.body.rating,
            estado: req.body.estado,
        }
        try {
            const fileBuffer = req.file.buffer;
            const urlImg = await CloudinaryService.uploadImage(fileBuffer);
            var createdServicio = await ServicioService.publicarServicio(Servicio, urlImg);
           
            return res.status(201).json({createdServicio, message: "Succesfully Created Servicio"})
        } catch (e) {
            
            console.log(e)
            return res.status(400).json({status: 400, message: "Servicio Creation was Unsuccesfull"})
        }
}

exports.borrarServicio = async function (req, res, next) {
    
    try {
        var id = req.body.id;
        var deleted = await ServicioService.borrarServicio(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.modificarServicio = async function (req, res, next) {
    var urlImg;

    if (req.file) {
        try {
            const fileBuffer = req.file.buffer;
            urlImg = await CloudinaryService.uploadImage(fileBuffer);
        } catch (e){
            return res.status(400).json({status: 400., message: e.message})
        }
        
    } else {
        urlImg = 0;
    }

    var Servicio = {
        id: req.body.id,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        frecuencia: req.body.frecuencia,
        duracion: req.body.duracion,
        tipo: req.body.tipo,
        costo: req.body.costo,
        estado: req.body.estado,
    }

    try {

        var updatedServicio = await ServicioService.modificarServicio(Servicio,urlImg)
        return res.status(200).json({status: 200, data: updatedServicio, message: "Succesfully Updated Servicio"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.getServiciosGenerales = async function (req, res, next) {
    
    var Servicio;

    if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
        Servicio = 0;
    } else {
        Servicio = {
            id: req.query.id,
            categoria: req.query.categoria,
            frecuencia: req.query.frecuencia,
            rating: req.query.rating,
            tipo: req.query.tipo,
        }
    }  
    try {
        var Servicios = await ServicioService.getServiciosGenerales(Servicio);
        return res.status(200).json({status: 200, data: Servicios, message: "Succesfully Servicios Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getServiciosDashboard = async function (req, res, next) {
    
    try {
        var id = req.query.id
        var Servicios = await ServicioService.getServiciosDashboard(id)
        return res.status(200).json({status: 200, data: Servicios, message: "Succesfully Servicios Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}