/* eslint-disable no-await-in-loop */
import { getStoreContract } from '../utils/contracts';
import * as types from './types';

export const fetchProducts = () => async dispatch => {
  const Store = getStoreContract();

  dispatch({
    type: types.FETCH_PRODUCTS,
  });

  try {
    const store = await Store.deployed();
    const productCount = await store.getProductCount.call();

    const products = [];
    for (let i = 0; i < productCount; i++) {
      const productId = await store.getProductIdAt.call(i);
      const [
        name,
        category,
        imageLink,
        descLink,
        price,
        index,
        status,
      ] = await store.getProduct.call(productId);

      products.push({
        name,
        category,
        imageLink,
        descLink,
        price,
        index,
        status,
      });
    }

    dispatch({
      type: types.FETCH_PRODUCTS_SUCCESS,
      products,
    });
  } catch (ex) {
    dispatch({
      type: types.FETCH_PRODUCTS_FAIL,
      message: ex,
    });
  }
};
