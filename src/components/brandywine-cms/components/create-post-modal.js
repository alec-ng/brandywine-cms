import React, { useState } from "react";
import { generateKey } from "./../post-util";
import Modal from "./modal";
import Spinner from "./spinner";

/*
 * Renders a button that opens up a modal to create a new post
 */
export default function CreatePostModal(props) {
  const [open, setOpen] = React.useState(false);
  const [locked, setLocked] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // lock modal and form when doing async db actions
  function handleFormSubmit(newData) {
    setLocked(true);
    props.onSubmit(newData, (isSuccess, dispatch) => {
      setLocked(false);
      if (isSuccess) {
        setOpen(false);
        window.setTimeout(dispatch, 100); // async dispatch for nice closeModal animation
      }
    });
  }

  return (
    <div>
      <button
        style={{ width: "100%" }}
        className="btn btn-success"
        type="button"
        onClick={handleOpen}
      >
        Create New Post
      </button>
      <Modal open={open} handleClose={handleClose} locked={locked}>
        <h2>Create a new post</h2>
        <p>
          Enter a unique title and date combination.
          <br />
          Titles can only be alphanumeric with spaces.
        </p>
        <ModalForm
          existingKeyList={props.existingKeyList}
          closeModal={handleClose}
          onSubmit={handleFormSubmit}
          locked={locked}
        />
      </Modal>
    </div>
  );
}

function ModalForm(props) {
  const [showKeyError, setShowKeyError] = useState(false);

  const formRef = React.useRef(null);
  const idList = props.existingKeyList.map(id => id.toUpperCase());
  const disabledProps = props.locked ? { disabled: true } : {};

  // On success, execute the submit cb, clear the form of all data, and close the modal
  function validateAndSubmit(e) {
    e.preventDefault();

    if (formRef.current.reportValidity()) {
      // check if date/title combination is unique
      let title = formRef.current
        .querySelector("[data-val=title]")
        .value.trim();
      let date = formRef.current.querySelector("[data-val=date]").value;
      let key = generateKey(date, title);
      let hasDuplicateKey = idList.indexOf(key.toUpperCase()) !== -1;
      setShowKeyError(hasDuplicateKey);
      if (hasDuplicateKey) {
        return;
      }

      let newData = {};
      formRef.current.querySelectorAll("input").forEach(input => {
        newData[input.dataset.val] = input.value;
      });
      props.onSubmit(newData);
    }
  }

  return (
    <>
      <form ref={formRef} onSubmit={validateAndSubmit}>
        <fieldset {...disabledProps}>
          <div className="form-group">
            <label style={{ width: "100%" }}>
              Title
              <input
                required
                minLength="3"
                maxLength="50"
                data-val="title"
                pattern="[a-zA-Z0-9\s]+"
                type="text"
                className="form-control"
              />
            </label>
            <label style={{ width: "100%" }}>
              Date
              <input
                required
                type="date"
                data-val="date"
                className="form-control"
              />
            </label>
          </div>
          {showKeyError && (
            <div className="text-center mb-4" style={{ color: "red" }}>
              <i>
                The title and date combination already exists. Please change
                either the title or date.
              </i>
            </div>
          )}
          <div className="text-right">
            <button
              type="button"
              onClick={props.closeModal}
              className="mr-2 btn btn-danger"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              {props.locked && <Spinner />}
              Create
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
