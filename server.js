const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON y datos de formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar el envío del formulario
app.post('/enviar', (req, res) => {
  const { name, apellido, Telefono, email, especialidad, estado } = req.body;

  // Ruta del archivo Excel
  const filePath = path.join(__dirname, 'uploads', 'datos.xlsx');

  let workbook;
  let worksheet;

  // Verificar si el archivo Excel ya existe
  if (fs.existsSync(filePath)) {
    // Leer el archivo Excel existente
    workbook = XLSX.readFile(filePath);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
  } else {
    // Crear un nuevo libro y hoja de cálculo
    workbook = XLSX.utils.book_new();
    worksheet = XLSX.utils.aoa_to_sheet([["Nombre", "Apellido", "Teléfono", "Email", "Especialidad", "Estado"]]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  }

  // Agregar una nueva fila con los datos del formulario
  const newRow = [name, apellido, Telefono, email, especialidad, estado];
  XLSX.utils.sheet_add_aoa(worksheet, [newRow], { origin: -1 });

  // Guardar el archivo Excel actualizado
  XLSX.writeFile(workbook, filePath);

  // Responder al cliente
  res.send('¡Formulario enviado correctamente y datos guardados en el servidor!');
});

// Ruta para descargar el archivo Excel
app.get('/descargar', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', 'datos.xlsx');
  res.download(filePath, 'datos.xlsx', (err) => {
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
