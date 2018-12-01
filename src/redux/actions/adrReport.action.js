import client from '../../helpers/client';
import * as types from './actionTypes';

export const saveAdrReport = (params) => {

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
    })
    .catch(err => {
      dispatch({
        type: types.SAVE_ADR_REPORT_FAILED,
        data: err.message
      })
    });
  };
};