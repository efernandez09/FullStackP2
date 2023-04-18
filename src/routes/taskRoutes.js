const express = require('express');
const router = express.Router();

const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskControllers');

// CREATE
router.post('/newTask', createTask);

// READ
router.get('/getTasks', getTasks);

// UPDATE
router.put('/:taskId', updateTask);

// DELETE
router.delete('/:taskId', deleteTask);

// Exportamos el router.
module.exports = router;
