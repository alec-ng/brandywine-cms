import React, { useState, useRef } from "react";
import { validateNewPost } from '../../../../util/post-validation';
import Modal from "../../universal/modal";
import Spinner from "../../universal/spinner";
import NewPostForm from '../forms/post-form-composer';

/*
 * Renders a button that opens up a modal to create a new post
 */
export default function CreatePostModal(
  {open, onClose, onSubmit, groupingDataSlice, postGroup, locked}
) {  
  const [validationErrors, setValidationErrors] = useState([]);
  const formRef = useRef();

  /**
   * Validates the current HTML form and runs standard validation for non-published posts
   * If successful, call onSubmit cb
   */
  function validateAndCreate() {
    if (!formRef.current.reportValidity()) {
        return;
    }
    const inputs = formRef.current.querySelectorAll('input')
    let newPostValues = {};
    inputs.forEach(input => {
      if (input.dataset.val && input.value) {
        newPostValues[input.dataset.val] = input.value;
      }
    });

    let validationErrors = [];
    validationErrors.push(
      ...validateNewPost(newPostValues.title, newPostValues.date, groupingDataSlice)
    );
    setValidationErrors(validationErrors);
    
    if (validationErrors.length === 0) {
      onSubmit(newPostValues);
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
        
        <form ref={formRef}>
          <fieldset disabled={locked}>
            <NewPostForm 
              grouping={postGroup}
              showReadOnly={false}
            />
            {validationErrors.length > 0 && (
              <div className="text-center mb-4" style={{ color: "red" }}>
                {validationErrors.map((error, i) => 
                  <p key={i}>{error}</p>  
                )}
              </div>
            )}      
          </fieldset>
        </form>
        
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
