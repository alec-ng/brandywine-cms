import React from 'react';
import Modal from '../../generic/modal';
import Spinner from '../../generic/spinner';

export default function DeletePostModal({open, onDelete, onClose, locked}) {
  return (
    <Modal open={open} handleClose={onClose} locked={locked}>
      <h2 className="mb-4">Delete</h2>
      <p>
        This action will delete your post and all of its contents, and cannot
        be undone.
      </p>
      <div className="text-right">
        <fieldset disabled={locked}>
          <button
            type="button"
            className="mr-2 btn btn-info"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onDelete}
          >
            {locked && <Spinner />}
            Delete
          </button>
        </fieldset>
      </div>        
    </Modal>
  );
}
