import React, { useState, useRef } from "react";
import { validateNewPost } from '../../../../util/post-validation';
import NewPostForm from '../../global/forms/new-post';
import Modal from "../../universal/modal";
import Spinner from "../../universal/spinner";

/*
 * Renders a button that opens up a modal to create a new post
 */
export default function CreatePostModal(
  {open, onClose, onSubmit, groupingDataSlice, postGroup, locked}
) {  
  const [validationErrors, setValidationErrors] = useState([]);
  const formRef = useRef();

  function validateAndCreate() {
    if (!formRef.current.reportValidity()) {
        return;
    }
    let validationErrors = [];
    const title = formRef.current.querySelector("[data-val=title]").value.trim();
    const date = formRef.current.querySelector("[data-val=date]").value;
    validationErrors.push(
      ...validateNewPost(title, date, postGroup, groupingDataSlice)
    );
    setValidationErrors(validationErrors);
    
    if (validationErrors.length === 0) {
      onSubmit({
        title: title,
        date: date
      });
    }
  }

  return (
    <div>
      <Modal open={open} handleClose={onClose} locked={locked}>
        <h2>Create a new post</h2>
        <p>
          Enter a unique title and date combination.
          <br />
          Titles can only be alphanumeric with spaces.
        </p>
        <NewPostForm 
          ref={formRef} 
          validationErrors={validationErrors} 
          isLocked={locked} 
        />
        <div className="text-right">
          <fieldset disabled={locked}>
            <button
              type="button"
              onClick={onClose}
              className="mr-2 btn btn-danger"
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-success"
              onClick={validateAndCreate}>
              {locked && <Spinner />}
              Create
            </button>
          </fieldset>
        </div>
      </Modal>
    </div>
  );
}
