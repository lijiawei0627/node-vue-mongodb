import types from './type';

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user
}

export default getters;
