const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = process.env.PORT || 3000;

// Conectar a la base de datos SQLite
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos SQLite');
  }
});

// Crear la tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS datos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  apellido TEXT,
  Telefono TEXT,
  email TEXT,
  especialidad TEXT,
  estado TEXT
)`);

// Middleware para parsear JSON y datos de formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar el envío del formulario
app.post('/enviar', (req, res) => {
  const { name, apellido, Telefono, email, especialidad, estado } = req.body;

  // Insertar los datos en la base de datos
  const query = `INSERT INTO datos (name, apellido, Telefono, email, especialidad, estado) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(query, [name, apellido, Telefono, email, especialidad, estado], function(err) {
    if (err) {
      console.error('Error al insertar los datos:', err);
      res.status(500).send('Error al insertar los datos');
    } else {
      res.send('¡Formulario enviado correctamente y datos guardados en la base de datos!');
    }
  });
});

// Ruta para descargar la base de datos
app.get('/descargar-db', (req, res) => {
  const filePath = path.join(__dirname, 'database.db');
  res.download(filePath, 'database.db', (err) => {
    if (err) {
      console.error('Error al descargar el archivo:', err);
      res.status(500).send('Error al descargar el archivo');
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
