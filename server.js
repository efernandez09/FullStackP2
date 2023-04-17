const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const appDir = path.join(__dirname, 'public');

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

// Manejar eventos de la conexión
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', function() {
  console.log("Conexión exitosa a la base de datos");
  // hacer algo con la base de datos
});

app.get('/', function(req, res) {
  res.sendFile('index.html', { root: appDir });
});

app.listen(3000, function() {
  console.log('Servidor iniciado en http://localhost:3000');
});
