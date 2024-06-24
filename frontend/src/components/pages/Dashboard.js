import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProductsByAdmin, addProduct, deleteProduct } from '../../redux/actions/productActions';

const Dashboard = ({ auth: { user }, getProductsByAdmin, product: { products, loading }, addProduct, deleteProduct }) => {
  useEffect(() => {
    if (user) {
      getProductsByAdmin(user._id);
    }
  }, [getProductsByAdmin, user]);

  const onSubmit = e => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      description: e.target.description.value,
      price: e.target.price.value
    };
    addProduct(formData);
  };

  return (
    <div className='container'>
      <h1 className='large text-primary'>Dashboard</h1>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input type='text' placeholder='Name' name='name' required />
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Description' name='description' required />
        </div>
        <div className='form-group'>
          <input type='number' placeholder='Price' name='price' required />
        </div>
        <input type='submit' className='btn btn-primary' value='Add Product' />
      </form>
      <div className='products'>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className='card'>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <button onClick={() => deleteProduct(product._id)} className='btn btn-danger'>
                Delete
              </button>
            </div>
          ))
        ) : (
          <h4>No products found...</h4>
        )}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  getProductsByAdmin: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product,
});

export default connect(mapStateToProps, { getProductsByAdmin, addProduct, deleteProduct })(Dashboard);
