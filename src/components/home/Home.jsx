import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as productActionsCreator from '../../actions/products';

class Home extends Component {
  static propTypes = {
    fetchProducts: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchProducts } = this.props;

    fetchProducts();
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }
}

export default connect(null, productActionsCreator)(Home);
