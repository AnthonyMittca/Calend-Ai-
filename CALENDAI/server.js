const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'calendai'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Routes
app.post('/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
  }

  const query = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
  db.query(query, [firstName, lastName, email, password], (err, result) => {
    if (err) {
      console.error('Erreur lors de la création du compte:', err);
      return res.status(500).json({ error: 'Erreur lors de la création du compte.' });
    }
    res.status(201).json({ message: 'Compte créé avec succès!' });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Veuillez fournir un email et un mot de passe.' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error('Erreur lors de la connexion:', err);
      return res.status(500).json({ error: 'Erreur lors de la connexion.' });
    }
    if (result.length === 0) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }
    res.status(200).json({ message: 'Connexion réussie!' });
  });
});

app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
