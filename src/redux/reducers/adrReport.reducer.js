import * as types from '../actions/actionTypes';

const defaultState = {
  isSavingReport: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SAVE_ADR_REPORT:
      return { ...state, isSavingReport: true };
    case types.SAVE_ADR_REPORT_SUCCESSFUL:
      return { ...state, isSavingReport: false };
    case types.SAVE_ADR_REPORT_FAILED:
      return { ...state, isSavingReport: false };
    default:
      return state;
  }
};