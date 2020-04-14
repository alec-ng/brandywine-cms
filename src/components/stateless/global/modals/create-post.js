import React, { useState, useRef } from "react";
import { validateNewPost } from '../../../../util/post-validation';
import Modal from "../../generic/modal";
import Spinner from "../../generic/spinner";
import BaseMetadataForm, { inputNames } from '../forms/base-post-metadata';

/*
 * Renders a button that opens up a modal to create a new post
 */
export default function CreatePostModal({
  open, 
  onClose, 
  onSubmit, 
  data, 
  locked
}) {  
  const [validationErrors, setValidationErrors] = useState([]);
  const [values, setValues] = useState(getEmptyFormValues());
  const formRef = useRef();

  function onInputChange(e) {
    setValues(Object.assign({}, values, {
      [e.target.name] : e.target.value
    }));
  }

  /**
   * Validates the current HTML form and runs standard validation for non-published posts
   * If successful, call onSubmit cb
   */
  function validateAndCreate() {
    if (!formRef.current.reportValidity()) {
      return;
    }
    let validationErrs = validateNewPost(values.title, values.date, data);
    setValidationErrors(validationErrs);
    if (!validationErrs.length) {
      onSubmit(values);
      setValues(getEmptyFormValues());
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
        
        <fieldset disabled={locked}>  
          <form ref={formRef}>
            <BaseMetadataForm
              onChange={onInputChange}
              values={values}
            />
            {validationErrors.length > 0 && (
              <div className="text-center mb-4" style={{ color: "red" }}>
                {validationErrors.map((error, i) => 
                  <p key={i}>{error}</p>  
                )}
              </div>
            )}      
          </form>
        
          <div className="text-right">
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
          </div>
        </fieldset>

      </Modal>
    </div>
  );
}

// ----------------------------

const getEmptyFormValues = () => 
  inputNames.reduce(
    (obj, key) => Object.assign({}, obj, { [key]: '' }),
    {}
  );