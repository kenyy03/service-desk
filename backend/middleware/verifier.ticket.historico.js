const Ticket = require("../models/ticket.model");
const User = require("../models/usuario.model");
const FlujosPasos = require("../models/flujos.pasos.model");


let historicoOpciones = {}

historicoOpciones.verifyAllRequiredFields = (req, res, next) => {
    const { ticket_id, flujo_paso_id, asignado_id } = req.body

    hasRequestAllRequiredFields = ticket_id && flujo_paso_id  && asignado_id
    if (!hasRequestAllRequiredFields) {
        res.status(400).send("Todos los campos son requeridos.");
        return;
        }
    next();
    };

historicoOpciones.verifyIfTicketExist = async (req, res, next) =>{
    const { ticket_id } = req.body;
    await Ticket.findOne({ _id: ticket_id })
    .then(() =>{
      next();
    })
    .catch(() => {
         res.status(500).send("El ticket no existe.");
         return;
    });
};

historicoOpciones.verifyIfUserExiste = async (req, res, next) =>{
    const { asignado_id } = req.body;
    await User.findOne({ _id: asignado_id })
    .then(() =>{
      next();
    })
    .catch(() => {
         res.status(500).send("El usuario asignado no existe.");
         return;
    });
};    

historicoOpciones.verifyIfWorkflowStepExist = async (req, res, next) =>{
    const { flujo_paso_id } = req.body;
    await FlujosPasos.findOne({ _id: flujo_paso_id })
    .then(() =>{
      next();
    })
    .catch(() => {
         res.status(500).send("El paso de flujo no existe.");
         return;
    });
};

module.exports = historicoOpciones;