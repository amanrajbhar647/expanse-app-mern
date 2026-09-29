const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
const connectDb = require('./config/connectDB');
const userRoutes = require('./routes/userRoutes');
dotenv.config();




connectDb();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });
// user routes
app.use('/api/v1/users', require('./routes/userRoutes'));

// transaction routes
app.use('/api/v1/transactions', require('./routes/transactionRoutes'));

// static files
app.use (express.static(path.join(__dirname, 'client/build')));

app.get('*',  (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', './client/build/index.html'));
});

//port

const PORT =  process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
