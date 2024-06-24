

const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
require('dotenv').config();

const app = express();
connectDB();

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
