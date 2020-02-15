import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../state/actions';
import { selectPendingStatus } from '../../state/selectors';
import { 
  CREATE_POST, DELETE_POST, PUBLISH_CURRENT_POST, UNPUBLISH_CURRENT_POST, SAVE_CURRENT_POST 
} from '../../state/actions/data-actions';

import CreatePostModal from '../stateless/global/modals/create-post';
import DeletePostModal from '../stateless/global/modals/delete-post';
import PublishPostModal from '../stateless/global/modals/publish-post';
import UnpublishPostModal from '../stateless/global/modals/unpublish-post';
import UnsavedChangesModal from '../stateless/global/modals/unsaved-changes';
import ValidationErrorModal from '../stateless/global/modals/validation-error';

const modalMap = {
  create: CreatePostModal,
  delete: DeletePostModal,
  publish: PublishPostModal,
  unpublish: UnpublishPostModal,
  unsavedChanges: UnsavedChangesModal,
  validationError: ValidationErrorModal
};


/**
 * Global modal manager - connects to store to decide which modal to set to visible, 
 * and passes any props if supplied.
 * Only supports one modal shown at a time
 */
function ModalManager({modalToShow, modalPayload, pendingFlags, dispatch}) {
  const onClose = () => { dispatch(closeModal()); }
  const modalList = Object.keys(modalMap).map(modalKey => {
    let modalProps = {
      onClose: onClose,
      open: modalKey === modalToShow,
      key: modalKey,
      locked: pendingFlags[modalKey] || false
    };
    if (modalProps.open) {
      modalProps = {...modalProps, ...modalPayload};
    }
    let ModalComponent = modalMap[modalKey];
    return <ModalComponent {...modalProps}  />
  });

  return (
    <>
      {modalList}
    </>
  );
}

const mapStateToProps = state => {
  return { 
    modalToShow: state.showModal ? state.showModal.type : null,
    modalPayload: state.showModal ? state.showModal.payload : null,
    pendingFlags: {
      create: selectPendingStatus(state, CREATE_POST),
      delete: selectPendingStatus(state, DELETE_POST),
      publish: selectPendingStatus(state, PUBLISH_CURRENT_POST),
      unpublish: selectPendingStatus(state, UNPUBLISH_CURRENT_POST),
      unsavedChanges: selectPendingStatus(state, SAVE_CURRENT_POST)
    }
  }
}
export default connect(mapStateToProps)(ModalManager);
