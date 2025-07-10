const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = 3000;


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'tutor_finder'
});

db.connect(err => {
  if (err) {
    console.error('Koneksi database gagal:', err);
  } else {
    console.log('Terhubung ke database MySQL');
  }
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));


app.post('/contact', (req, res) => {
  const { name, email, tutor, message } = req.body;
  const sql = 'INSERT INTO kontak (name, email, tutor, message) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, tutor, message], (err, result) => {
    if (err) {
      console.error('Error saat menyimpan:', err);
      res.status(500).send('Gagal menyimpan data.');
    } else {
      res.send('Permintaan tutor berhasil dikirim!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
