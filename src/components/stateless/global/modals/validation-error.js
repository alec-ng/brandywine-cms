import React from 'react';
import Modal from '../../generic/modal';

export default function ValidationErrorModal({
  open, 
  errors, 
  onClose
}) {
  return (
    <Modal open={open} handleClose={onClose}>
      <h2 className="mb-4">Error</h2>
      <p>
        Please fix the following:
      </p>
      <ol>
        { errors && errors.length &&
          errors.map((error, i) => 
            <li key={i}>{error}</li>
          )
        }
      </ol>
      <div className="text-right">
        <button
          type="button"
          className="mr-2 btn btn-info"
          onClick={onClose}
        >
          Close
        </button>
      </div>        
    </Modal>
  );
}