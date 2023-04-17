const mongoose = require('mongoose');

// ! Schema Tablones

let schemaTablones = new mongoose.Schema({
    
    titulo: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        minlenght: [5, 'No se cumple la longitud mínima de la descripción'],
        maxlenght: [150, 'Has superado el máximo permitido de caracteres (150)'],
        required: true
    },

    autor: {
        type: String,
        required: true
    }

});

// Creamos el modelo

const modeloTablones = new mongoose.model('modeloTablones', schemaTablones);

// Exportamos el modelo

module.exports = modeloTablones;