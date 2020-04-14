import React from 'react';
import Modal from '../../generic/modal';
import Spinner from '../../generic/spinner';

export default function PublishModal({open, onClose, locked, onConfirm}) {
  return (
    <Modal open={open} handleClose={onClose} locked={locked}>
      <h2>Unpublish</h2>
      <p>
        You are about to unpublish this post, <b>as well as save any changes you
        have made</b>. The general public will not be able to see this
        post anymore.
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
            className="btn btn-success"
            onClick={onConfirm}
          >
            {locked && <Spinner />}
            Unpublish
          </button>
        </fieldset>
      </div>
    </Modal>
  );
}