import client from '../../helpers/client';
import * as types from './actionTypes';

export const saveAdrReport = (params, callback) => {

  return dispatch => {
    dispatch({ type: types.SAVE_ADR_REPORT });
    client.api(
      'adr-report/save',
      'post',
      params || {}
    )
    .then(res => {
      dispatch({
        type: types.SAVE_ADR_REPORT_SUCCESSFUL,
        data: res.data
      });
      callback && callback(res.data);
    })
    .catch(err => {
      dispatch({
        type: types.SAVE_ADR_REPORT_FAILED,
        data: err.message
      })
    });
  };
};

export const getAdrReport = (params, callback) => {

  return dispatch => {
    dispatch({ type: types.GET_ADR_REPORT });
    client.api(
      'adr-report/get',
      {
        params: params
      }
    )
    .then(res => {
      dispatch({
        type: types.GET_ADR_REPORT_SUCCESSFUL,
        data: res.data.data
      });
      callback && callback(res.data.data);
    })
    .catch(err => {
      dispatch({
        type: types.GET_ADR_REPORT_FAILED,
        data: err.message
      })
    });
  };
};