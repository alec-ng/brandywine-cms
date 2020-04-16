import React, { useState, useRef } from "react";
import { ERR_SLUG_NON_UNIQUE, validateSlug } from '../../../../util/post-generation';
import { baseMdFactory } from '../../../../types/post-metadata';

import Modal from "../../generic/modal";
import Spinner from "../../generic/spinner";
import BaseMetadataForm from '../forms/base-post-metadata';


/*
 * Renders a button that opens up a modal to create a new post
 */
export default function CreatePostModal({
  open, 
  onClose, 
  onSubmit, 
  cmsPosts, 
  locked
}) {  
  const [validationErrors, setValidationErrors] = useState([]);
  const [baseMetadata, setBaseMetadata] = useState(baseMdFactory());
  const formRef = useRef();

  // reset form values on close, synchronizing timing with fade
  function onModalClose() {
    setTimeout(() => {
      setBaseMetadata(baseMdFactory());
      setValidationErrors([]);
    }, 300);
    onClose(); 
  }

  // controlled form 
  function onInputChange(e) {
    setBaseMetadata(Object.assign({}, baseMetadata, {
      [e.target.name] : e.target.value.trim()
    }));
  }

  // Validates form values and on success, fires onSubmit cb
  function validateAndCreate() {
    if (!formRef.current.reportValidity()) {
      return;
    }
    const isValidSlug = validateSlug(baseMetadata, cmsPosts);
    if (!isValidSlug) {
      setValidationErrors([ERR_SLUG_NON_UNIQUE]);
      return;
    }
    onSubmit(baseMetadata);
  }

  return (
    <div>
      <Modal open={open} handleClose={onModalClose} locked={locked}>

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
              values={baseMetadata}
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
              onClick={onModalClose}
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
