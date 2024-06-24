const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); // Make sure the path to your Product model is correct

dotenv.config();

const products = [
  {
    name: 'iPhone 12',
    description: 'Apple iPhone 12 with 64GB memory',
    price: 799,
    createdBy: 'AdminID1', // replace with a valid Admin ID
  },
  {
    name: 'Samsung Galaxy S21',
    description: 'Samsung Galaxy S21 with 128GB memory',
    price: 999,
    createdBy: 'AdminID2', // replace with a valid Admin ID
  },
  {
    name: 'OnePlus 9',
    description: 'OnePlus 9 with 128GB memory',
    price: 729,
    createdBy: 'AdminID1', // replace with a valid Admin ID
  },
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  return Product.insertMany(products);
})
.then(() => {
  console.log('Products added successfully');
  mongoose.disconnect();
})
.catch((error) => {
  console.error('Error adding products:', error);
  mongoose.disconnect();
});
