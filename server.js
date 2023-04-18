const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Importamos las rutas de las Tasks y las Cards
const cardRoutes = require('../FullStackP2/src/routes/cardRoutes');
const taskRoutes = require('../FullStackP2/src/routes/taskRoutes');

// Cadena de conexión
const uri = 'mongodb+srv://admin:1234@cluster0.amvowh2.mongodb.net/test';

// Opciones de configuración de la conexión
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Conexión
mongoose.connect(uri, options);

// Obtener la instancia de la conexión
const db = mongoose.connection;


// Cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Manejar eventos de la conexión
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', function() {
  console.log("Conexión exitosa a la base de datos");
  // hacer algo con la base de datos
});

// Definimos el pueto predeterminado y lo que se ejecutara cuando se inicie el servidor.
app.listen(3000, function() {
  console.log('Servidor iniciado en http://localhost:3000');
});

// Middelwares
app.use('/api/cards', cardRoutes);
app.use('/api/tasks', taskRoutes);