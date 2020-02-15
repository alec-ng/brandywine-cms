import React from 'react';
import Modal from '../../universal/modal';
import Spinner from '../../universal/spinner';

export default function PublishModal({open, onClose, locked, onConfirm}) {
  return (
    <Modal open={open} handleClose={onClose} locked={locked}>
      <h2>Publish</h2>
      <p>
        You are about to publish this post, <b>which includes changes you have 
        made</b>. The post will be visible to the general public.
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
            Confirm
          </button>
        </fieldset>
      </div>
    </Modal>
  );
}