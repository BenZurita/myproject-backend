const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON y datos de formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar el envío del formulario
app.post('/enviar', (req, res) => {
  const { name, apellido, Telefono, email, especialidad, estado } = req.body;

  // Aquí puedes agregar la lógica para procesar los datos del formulario
  console.log('Datos recibidos:', { name, apellido, Telefono, email, especialidad, estado });

  // Responder al cliente
  res.send('¡Formulario enviado correctamente!');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
