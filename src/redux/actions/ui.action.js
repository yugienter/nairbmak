import * as types from './actionTypes';

export const updatePageStatus = (status) => {
  return dispatch => {
    dispatch({ type: types.UPDATE_PAGE_STATUS, data: status });
  };
};

export const updateMessageStatus = (show = true) => {
  return dispatch => {
    dispatch({ type: types.UPDATE_MESSAGE_STATUS, data: show });
  };
};
