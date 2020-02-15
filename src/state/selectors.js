export function selectPendingStatus(state, actionType) {
  return state.pending[actionType]
    ? state.pending[actionType].pending
    : false;
}

export function selectCurrentDataSlice(state) {
  return state.data[state.postGroup] || {};
}