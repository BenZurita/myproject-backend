const fs = require('fs');
const express = require('express');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const app = express();
app.use(express.json());

const csvWriter = createCsvWriter({
    path: 'data.csv',
    header: [
        { id: 'name', title: 'Nombre' },
        { id: 'apellido', title: 'Apellido' },
        { id: 'Telefono', title: 'Teléfono' },
        { id: 'email', title: 'Email' },
        { id: 'especialidad', title: 'Especialidad' },
        { id: 'estado', title: 'Estado' }
    ],
    append: true
});

app.post('/enviar', (req, res) => {
    const data = [req.body];
    csvWriter.writeRecords(data)
        .then(() => res.send('Datos guardados en data.csv'))
        .catch((err) => res.status(500).send(err));
});

// Ruta para descargar el archivo CSV con autenticación
app.get('/descargar', (req, res) => {
    const secret = req.query.secret;
    const expectedSecret = 'OftalmiBD'; // Cambia esto por una clave secreta segura

    if (secret !== expectedSecret) {
        return res.status(403).send('Acceso denegado');
    }

    const file = `${__dirname}/data.csv`;
    res.download(file, 'data.csv', (err) => {
        if (err) {
            res.status(500).send({
                message: "Error al descargar el archivo.",
                error: err.message
            });
        }
    });
});

app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));
