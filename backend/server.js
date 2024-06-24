// const express = require('express');
// const connectDB = require('./config/db');
// const bodyParser = require('body-parser');
// const userRoutes = require('./routes/user');
// const productRoutes = require('./routes/product');
// require('dotenv').config();

// const app = express();
// connectDB();

// app.use(bodyParser.json());

// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Add this line

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})
.catch((error) => console.log(error));
