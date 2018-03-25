import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';
import { fromWei } from '../../utils/web3';
import styles from './product.scss';

const { Meta } = Card;

const STATUS = {
  0: 'Available',
  1: 'Buying',
  2: 'Shipping',
  3: 'Sold',
};

const Product = ({ product }) => (
  <Card
    className={styles.product}
    cover={
      <img
        alt={product.name}
        src={product.imageLink}
      />
    }
    actions={[
      <span>{STATUS[product.status.toNumber()]}</span>,
      <span>{fromWei(product.price, 'finney').toString()} finney</span>,
      <Icon type="shopping-cart" />,
    ]}
  >
    <Meta
      title={product.name}
      description={product.descLink}
    />
  </Card>
);

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
