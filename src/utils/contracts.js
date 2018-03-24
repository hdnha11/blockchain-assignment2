import contract from 'truffle-contract';
import { getWeb3 } from '../utils/web3';
import StoreContract from '../../build/contracts/Store.json';

export const getStoreContract = () => {
  const web3 = getWeb3();
  const Store = contract(StoreContract);

  Store.setProvider(web3.currentProvider);

  return Store;
};
