import React from "react";
import Modal from "./modal";

// Publish
///////////////////////////////////////////////////////////////

export function PublishModal(props) {
  const PublishBody = (
    <>
      <h2>Publish</h2>
      <p>
        You are about to publish this post and any changes you have made this
        session. The post will be visible to the general public.
      </p>
    </>
  );
  const UnpublishBody = (
    <>
      <h2>Unpublish</h2>
      <p>
        You are about to unpublish this post, as well as save any changes you
        have made this session. The general public will not be able to see this
        post anymore.
      </p>
    </>
  );

  return (
    <Modal open={props.open} handleClose={props.handleClose}>
      {props.newPublishStatus ? PublishBody : UnpublishBody}
      <div className="text-right">
        <button
          type="button"
          className="mr-2 btn btn-info"
          onClick={props.handleClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={props.onConfirm}
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
}

// Save and Exit
///////////////////////////////////////////////////////////////

export function SavePostModal(props) {
  function onNoClick() {
    props.handleClose();
    window.setTimeout(props.onNoClick, 100);
  }
  function onYesClick() {
    props.handleClose();
    window.setTimeout(props.onYesClick, 100);
  }

  return (
    <Modal open={props.open} handleClose={props.handleClose}>
      <h2>Save and Exit</h2>
      <p>
        You have unsaved changes which will be lost unless it is saved. Would
        you like to save before continuing?
      </p>
      <div className="text-right">
        <button
          type="button"
          className="mr-2 btn btn-danger"
          onClick={onNoClick}
        >
          Exit Without Saving
        </button>
        <button type="button" className="btn btn-success" onClick={onYesClick}>
          Save and Exit
        </button>
      </div>
    </Modal>
  );
}

// Validation Errors
///////////////////////////////////////////////////////////////

export function ValidationModal(props) {
  const errorList = props.errors.map((error, i) => <li key={i}>{error}</li>);

  return (
    <Modal open={props.open} handleClose={props.handleClose}>
      <h2 className="mb-4">Please fix the following...</h2>
      <ol>{errorList}</ol>
    </Modal>
  );
}

// Delete
///////////////////////////////////////////////////////////////

export function DeleteConfirmationModal(props) {
  function PublishedBody(props) {
    return (
      <>
        <h2 className="mb-4">Error</h2>
        <p>
          Published posts cannot be deleted. Please unpublish this post first.
        </p>
        <div className="text-right">
          <button
            type="button"
            className="btn btn-info"
            onClick={props.onClose}
          >
            Close
          </button>
        </div>
      </>
    );
  }
  function UnpublishedBody(props) {
    return (
      <>
        <h2 className="mb-4">Delete</h2>
        <p>
          This action will delete your post and all of its contents, and cannot
          be undone.
        </p>
        <div className="text-right">
          <button
            type="button"
            className="mr-2 btn btn-info"
            onClick={props.onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={props.onDelete}
          >
            Delete
          </button>
        </div>
      </>
    );
  }
  return (
    <Modal open={props.open} handleClose={props.handleClose}>
      {props.isPublished ? (
        <PublishedBody onClose={props.handleClose} />
      ) : (
        <UnpublishedBody
          onCancel={props.handleClose}
          onDelete={props.onDelete}
        />
      )}
    </Modal>
  );
}
