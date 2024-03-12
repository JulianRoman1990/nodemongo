const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/userModel');;
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Conecta a la base de datos MongoDB
connectDB();

// Configura las rutas
app.use('/', routes);

app.listen(port, () => console.log('Server active on port', port));

