import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProducts } from '../../redux/actions/productActions';
import ProductItem from './ProductItem';

const Home = ({ getProducts, product: { products, loading } }) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className='container'>
      <h1 className='large text-primary'>Products</h1>
      <div className='products'>
        {products.length > 0 ? (
          products.map(product => <ProductItem key={product._id} product={product} />)
        ) : (
          <h4>No products found...</h4>
        )}
      </div>
    </div>
  );
};

Home.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  product: state.product,
});

export default connect(mapStateToProps, { getProducts })(Home);
