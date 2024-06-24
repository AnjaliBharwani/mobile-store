const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createProduct,
  getProducts,
  getProductsByAdmin,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.post('/', auth, createProduct);
router.get('/', getProducts);
router.get('/admin/:adminEmail', getProductsByAdmin);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
