const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'myges'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Routes
app.post('/login-myges', (req, res) => {
  const { email, mot_de_passe } = req.body;

  console.log('Requête de connexion reçue:', req.body);

  if (!email || !mot_de_passe) {
    return res.status(400).json({ error: 'Veuillez fournir un email et un mot de passe.' });
  }

  const query = 'SELECT * FROM eleve WHERE email = ? AND mot_de_passe = ?';
  db.query(query, [email, mot_de_passe], (err, result) => {
    if (err) {
      console.error('Erreur lors de la connexion:', err);
      return res.status(500).json({ error: 'Erreur lors de la connexion.' });
    }
    if (result.length === 0) {
      console.log('Aucun utilisateur trouvé avec cet email et mot de passe');
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }
    console.log('Utilisateur connecté avec succès:', result[0]);
    res.status(200).json({ message: 'Connexion réussie!' });
  });
});


app.listen(port, () => {
  console.log(`Serveur backend myGes démarré sur http://localhost:${port}`);
});
