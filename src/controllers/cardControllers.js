const Card = require('../models/cardModel');

// Método para crear nuevas Cards
exports.createCard = async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.status(201).json({ success: true, message: 'Se ha creado la nueva Card correctamente!', data: card });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Ha ocurrido un error al intentar crear la tarea...' });
  }
};

// Método para mostrar todas las Cards
exports.getCards = async (req, res) => {
    try {
      const cards = await Card.find();
      res.status(200).json({ success: true, data: cards });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  };

  // Marodo para editar las cards existentes.
  exports.updateCard = async (req, res) => {
    try {
      const { num_semana, nombre, color, descripcion, year, vacaciones } = req.body;
      const card = await Card.findById(req.params.cardId);
      if (!card) {
        res.status(404).json({ success: false, error: 'No se ha encontrado la Card al intentar actualizarla' });
        return;
      }
      card.num_semana = num_semana || card.num_semana;
      card.nombre = nombre || card.nomnbre;
      card.color = color || card.color;
      card.descripcion = descripcion || card.descripcion;
      card.year = year || card.year;
      card.vacaciones = vacaciones || card.vacaciones;
      const updatedUser = await card.save();
      res.status(200).json({ success: true, data: updatedUser, message: "Se ha actualizado la card correctamente." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message, message: "No se ha podido actualizar la card..."  });
    }
  };

  // Método para eliminar cards existentes.
  exports.deleteCard = async (req, res) => {
    try {
      const card = await Card.findByIdAndDelete(req.params.cardId);
      if (!card) {
        res.status(404).json({ success: false, error: 'No se ha encontrado la Card al intentar eliminarla' });
        return;
      }
      res.status(200).json({ success: true, data: card, message: "Se ha eliminado la card correctament!"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message, message: "No se ha podido eliminar la card..." });
    }
  };



