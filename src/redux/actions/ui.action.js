import * as types from './actionTypes';

export const updateMessageStatus = (show = true) => {
  return dispatch => {
    dispatch({ type: types.UPDATE_MESSAGE_STATUS, data: show });
  };
};
