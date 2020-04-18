import React from 'react';
import { connect } from 'react-redux';
import { closeSnackbar } from '../../state/actions';
import Snackbar from '../stateless/generic/snackbar';

export function getSnackbarMessage(action, title) {
  switch (action) {
    case "create":
      return `${title} has been created.`;
    case "delete":
      return `${title} has been deleted.`;
    case "update":
      return `${title} has been saved.`;
    case "publish":
      return `${title} has been published.`;
    case "unpublish":
      return `${title} has been unpublished.`;
    case "error":
      return title;
    default:
      return '';
  }
}

/**
 * Shows one snackbar at a time depending on the value in the store
 * Snackbar will autoclose after 5 seconds, also updating the store
 */
function SnackbarManager({snackbarMessage, dispatch}) {
  const showSnackbar = snackbarMessage && snackbarMessage.length > 0;
  const handleClose = () => { dispatch(closeSnackbar()); }
  return (
    <Snackbar
      open={showSnackbar}
      handleClose={handleClose}
      message={snackbarMessage}
    />
  );
}

function mapStateToProps(state) {
  return {
    snackbarMessage: state.snackbar
  }
}
export default connect(mapStateToProps)(SnackbarManager);
