import React from 'react';
import PropTypes from 'prop-types';

const ProductItem = ({ product: { name, description, price, createdBy } }) => {
  return (
    <div className='card'>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{price}</p>
      <p>{createdBy && createdBy.email}</p>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;
