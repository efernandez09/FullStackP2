const mongoose = require('mongoose');

// ! Schema Tablones

// Declaramos el patrón de datos que llevara cada elemento Tarea
// y sus tipados correspondientes.

let schemaTasks = new mongoose.Schema({
    
    taskId: {
        type: String,
        required: true,
        default: Math.random()
    },

    idcard: {
        type: String,
        required: true
    },
    
    nombre: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    color: {
        type: String,
        required: true
    },

    dia: {
        type: String,
        required: true
    },

    completada: {
        type: Boolean,
        required: true
    },

    horaI: {
        type: Number,
        required: true
    },

    horaF: {
        type: Number,
        required: true
    }

});

// Creamos el modelo

const taskModel = new mongoose.model('taskModel', schemaTasks);

// Exportamos el modelo

module.exports = taskModel;