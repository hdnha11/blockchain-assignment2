import { combineReducers } from 'redux';
import * as types from '../actions/types';

const all = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_SUCCESS:
      return [...action.products];

    case types.FETCH_PRODUCTS:
    case types.FETCH_PRODUCTS_FAIL:
      return [];

    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return true;

    case types.FETCH_PRODUCTS_SUCCESS:
    case types.FETCH_PRODUCTS_FAIL:
      return false;

    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_FAIL:
      return action.message;

    case types.FETCH_PRODUCTS:
    case types.FETCH_PRODUCTS_SUCCESS:
      return null;

    default:
      return state;
  }
};

const products = combineReducers({
  all,
  isFetching,
  errorMessage,
});

export default products;
