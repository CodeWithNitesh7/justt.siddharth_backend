const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./src/config/db');

// Connecting database
connectDB();
const app = express();
const PORT = process.env.PORT;
const Origin = [
  'https://codexnitesh.vercel.app',
  'https://codewithnitesh.vercel.app',
  'https://CodeWithNitesh.vercel.app'
];

const Options = {
  origin: function (origin, callback) {
    if (!origin || Origin.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'PUT', 'PATCH', 'DELETE', 'POST'],
  credentials: true
};
app.use(cors(Options));
app.use(express.json());
app.use(cookieParser());
// routers 
app.use('/auth',require('./src/routes/auth.routes'))
app.use('/projects',require('./src/routes/projects.routes'))
app.use('/contact',require('./src/routes/contact.routes'))

app.listen(PORT,()=>console.log(`Server is running on http://localhost:${PORT}`))
