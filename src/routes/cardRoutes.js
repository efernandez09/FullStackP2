const express = require('express');
const router = express.Router();

// Importamos los metodos para poder añadirlos a las rutas.
const { createCard, getCards, updateCard, deleteCard } = require('../controllers/cardControllers');

// CREATE
router.post('/', createCard);

// READ
router.get('/', getCards);

// UPDATE
router.put('/:cardId', updateCard);

// DELETE
router.delete('/:cardId', deleteCard);

module.exports = router;
