const {model, Schema} = require('mongoose');

const tasksSchema = new Schema({
    idcard: {type: String, required: true},
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    color: {type: String, required: true},
    dia: {type: Number, required: true},
    horaI: {type: Number, required: true},
    horaF: {type: Number, required: true}
});

module.exports = model('Tasks', tasksSchema);