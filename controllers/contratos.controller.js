var ContratoService = require('../services/contratos.service');

exports.publicarContratacion = async function (req, res, next) {
    var Contrato = {
        userid: req.body.userid,
        alumno: req.body.alumno,
        servicio: req.body.servicio,
        telefono: req.body.telefono,
        email: req.body.email,
        horario: req.body.horario,
        estado: req.body.estado,
    }
    try {
        
        var createdContrato = await ContratoService.publicarContratacion(Contrato);
       
        return res.status(201).json({createdContrato, message: "Succesfully Created Contract"})
    } catch (e) {
        return res.status(400).json({status: 400, message: "Contract Creation was Unsuccesfull"})
    }
}

exports.modificarContratacion = async function (req, res, next) {
    if (!req.body.id) {
        return res.status(400).json({status: 400., message: "Id be present"})
    }
    if (!req.body.estado) {
        return res.status(400).json({status: 400., message: "Estado be present"})
    }

    var Contrato = {
        id: req.body.id ? req.body.id : null,
        estado: req.body.estado ? req.body.estado : null
    }

    try {
        var updatedContrato = await ContratoService.modificarContratacion(Contrato);
        return res.status(200).json({status: 200, data: updatedContrato, message: "Succesfully Updated Contrato"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.borrarContratacion = async function (req, res, next) {
    
    try {
        var id = req.body.id;
        var deleted = await ContratoService.borrarContratacion(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.getContrataciones = async function (req, res, next) {
    
    try {
        var id = req.query.id
        var Contratos = await ContratoService.getContrataciones(id)
        return res.status(200).json({status: 200, data: Contratos, message: "Succesfully Contratos Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

