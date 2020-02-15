import React from 'react';
import Modal from '../../universal/modal';
import Spinner from '../../universal/spinner';

export default function UnsavedChangesModal({open, onClose, locked, onExit, onSave}) {
  return (
    <Modal open={open} handleClose={onClose} locked={locked}>
      <h2>Save and Exit</h2>
      <p>
        You have unsaved changes which will be lost unless it is saved. Would
        you like to save before continuing?
      </p>
      <div className="text-right">
        <fieldset disabled={locked}>
          <button
            type="button"
            className="mr-2 btn btn-danger"
            onClick={onExit}
          >
            Exit Without Saving
          </button>
          <button type="button" className="btn btn-success" onClick={onSave}>
            {locked && <Spinner />} Save and Exit
          </button>
        </fieldset>
      </div>
    </Modal>
  );
}