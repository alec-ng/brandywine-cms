import React from 'react';
import Modal from '../../generic/modal';

export default function ValidationErrorModal({open, errors, onClose}) {
  if (!errors || errors.length === 0) {
    return null;
  }

  const errorList = errors.map((error, i) => <li key={i}>{error}</li>);
  return (
    <Modal open={open} handleClose={onClose}>
      <h2 className="mb-4">Error</h2>
      <p>
        Please fix the following:
      </p>
      <ol>
        {errorList}
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