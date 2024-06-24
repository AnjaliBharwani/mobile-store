const Product = require('../models/Product');
const User = require('../models/User');

exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      createdBy: req.user.id
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', ['email']);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProductsByAdmin = async (req, res) => {
  try {
    const admin = await User.findOne({ email: req.params.adminEmail });
    if (!admin) {
      return res.status(404).json({ msg: 'Admin not found' });
    }

    const products = await Product.find({ createdBy: admin.id });
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    if (product.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    product = await Product.findByIdAndUpdate(req.params.id, { $set: { name, description, price } }, { new: true });

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// exports.deleteProduct = async (req, res) => {
//   try {
//     let product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ msg: 'Product not found' });
//     }

//     if (product.createdBy.toString() !== req.user.id) {
//       return res.status(401).json({ msg: 'User not authorized' });
//     }

//     await Product.findByIdAndRemove(req.params.id);

//     res.json({ msg: 'Product removed' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
// exports.deleteProduct = async (req, res) => {
//   try {
//     let product = await Product.findById(req.params.id);

//     if (!product) {
//       console.log('Product not found');
//       return res.status(404).json({ msg: 'Product not found' });
//     }

//     // Check if the user making the request is the owner of the product
//     if (product.createdBy.toString() !== req.user.id) {
//       console.log('User not authorized');
//       return res.status(401).json({ msg: 'User not authorized' });
//     }

//     await Product.findByIdAndRemove(req.params.id);

//     res.json({ msg: 'Product removed' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };
exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      console.log('Product not found');
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Check if the user making the request is the owner of the product
    if (product.createdBy.toString() !== req.user.id) {
      console.log('User not authorized');
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
