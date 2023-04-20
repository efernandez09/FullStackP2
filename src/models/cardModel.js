const mongoose = require('mongoose');

// ! Schema Cards

// Declaramos el patrón de datos que llevara cada elemento Card
// y sus tipados correspondientes.

let schemaCards = new mongoose.Schema({
    
    cardId: {
        type: String,
        required: true
    },
    
    num_semana: {
        type: String,
        required: true
    },

    nombre: {
        type: String,
        required: true
    },

    color:{
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    year: {
        type: String,
        required: true
    },

    vacaciones: {
        type: Boolean,
        required: true
    }

});

// Creamos el modelo

const cardModel = new mongoose.model('cardModel', schemaCards);

// Exportamos el modelo

module.exports = cardModel;