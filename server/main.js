require('dotenv').config();

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const gameRoutes = require('./routes/game.routes');

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'casino_secret';

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
// TODO: for production use - change to someting more secure, details in README
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true }));

app.use('/api', gameRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

