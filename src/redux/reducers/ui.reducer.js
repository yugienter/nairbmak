import * as types from '../actions/actionTypes';

const defaultState = {
  metaSttShow: false,
  status: 'init'
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.UPDATE_MESSAGE_STATUS:
      return { ...state, metaSttShow: action.data };
    default:
      return state;
  }
};
