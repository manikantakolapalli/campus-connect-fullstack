const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key_here_change_this'; // Change in production

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
const frontendPath = path.join(__dirname, '../FRONTEND');
app.use(express.static(frontendPath));

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'login.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(frontendPath, 'register.html'));
});
app.get('/studentdashboard.html', (req, res) => {
  res.sendFile(path.join(frontendPath, 'studentdas.html'));
});

// Initialize SQLite DB
const dbPath = path.join(__dirname, 'mediaData.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Could not connect to SQLite database:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connected to SQLite database at', dbPath);
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )`,
      (err) => {
        if (err) {
          console.error('❌ Error creating users table:', err.message);
        } else {
          console.log('✅ Users table is ready');
        }
      }
    );
  }
});

// Register API
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint')) {
            console.log('⚠️ Username already exists:', username);
            return res.status(400).json({ error: 'Username already exists' });
          }
          console.error('❌ DB Error during registration:', err.message);
          return res.status(500).json({ error: 'Database error' });
        }

        console.log('✅ New user registered:', username);
        return res.json({ message: 'User registered successfully', userId: this.lastID });
      }
    );
  } catch (error) {
    console.error('❌ Hashing error:', error.message);
    return res.status(500).json({ error: 'Error hashing password' });
  }
});

// Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password required' });

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) {
      console.error('❌ DB Error during login:', err.message);
      return res.status(500).json({ error: 'Database error' });
    }
    if (!user) {
      console.log('❌ Login failed: user not found');
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('❌ Login failed: wrong password for', username);
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: '1h',
    });

    console.log('✅ Login successful:', username);
    res.json({ message: 'Login successful', token, username: user.username });
  });
});

// Fallback for undefined routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
