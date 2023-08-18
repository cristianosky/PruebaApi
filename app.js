const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

// Crear una conexión al pool de MySQL
const pool = mysql.createPool({
  host: 'bczsetqiyg8ogjwsob7o-mysql.services.clever-cloud.com',
  user: 'uj4m6mgrf8jfp0ua',
  password: 'Hea0AnzvUs7cR1DzH6yS',
  database: 'bczsetqiyg8ogjwsob7o',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware para manejar JSON
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

app.post('/api/enviar', (req, res) => {
  const { email, pass } = req.body;
  const query = 'INSERT INTO login (correo, password) VALUES (?, ?)';
  const values = [email, pass];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error('Error al almacenar la entrada:', error);
      res.status(500).json({ mensaje: 'Error al almacenar la entrada' });
    } else {
      res.status(201).json({ mensaje: 'Entrada almacenada con éxito' });
    }
  });
});
