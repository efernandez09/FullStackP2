const Task = require('../models/taskModel');

// Metodo para crear una nueva tarea
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ success: true, message: 'Task created successfully!', data: task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Ha ocurrido un error al intentar crear la tarea...' });
  }
};

  // Método para mostrar todas las Tasks
  exports.getTasks = async (req, res) => {
      try {
        const tasks = await Task.find();
        res.status(200).json({ success: true, data: tasks });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
      }
    };
  
    // Marodo para editar las cards existentes.
    exports.updateTask = async (req, res) => {
      try {
        const { nombre, descripcion, color, dia, completada, horaI, horaF } = req.body;
        const task = await Task.findById(req.params.taskId);
        if (!task) {
          res.status(404).json({ success: false, error: 'No se ha encontrado la task al intentar actualizarla' });
          return;
        }
        task.nombre = nombre || task.nomnbre;
        task.descripcion = descripcion || task.descripcion;
        task.color = color || task.color;
        task.dia = dia || task.dia;
        task.completada = completada || task.completada;
        task.horaI = horaI || task.horaI;
        task.horaF = horaF || task.horaF;
        const updatedUser = await task.save();
        res.status(200).json({ success: true, data: updatedUser, message: "Se ha actualizado la task correctamente." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message, message: "No se ha podido actualizar la task..."  });
      }
    };
  
    // Método para eliminar cards existentes.
    exports.deleteTask = async (req, res) => {
      try {
        const task = await Task.findByIdAndDelete(req.params.taskId);
        if (!task) {
          res.status(404).json({ success: false, error: 'No se ha encontrado la task al intentar eliminarla' });
          return;
        }
        res.status(200).json({ success: true, data: task, message: "Se ha eliminado la task correctament!"});
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message, message: "No se ha podido eliminar la task..." });
      }
    };