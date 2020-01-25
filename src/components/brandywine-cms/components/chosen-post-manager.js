import React, { useRef, useState } from "react";
import styled from "styled-components";
import PageMetadataForm from "./page-metadata-form";
import isEqual from "react-fast-compare";
import { validatePost } from "./../post-util";
import Spinner from "./spinner";
import {
  ValidationModal,
  SavePostModal,
  DeleteConfirmationModal,
  PublishModal
} from "./modal-collection";

const BackBtn = styled.button`
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.75);
  color: rgba(255, 255, 255, 0.75);
  border-radius: 3px;
  padding: 2px 10px;
`;
const FullWidthBtn = styled.button`
  width: 100%;
`;

/**
 * Component manager for toolbar view when a post is selected
 */
export default function ChosenPostManager(props) {
  // Constants
  ////////////////////////////////////////////////

  // Metadata form state
  const [formDisabled, setFormDisabled] = useState(false);
  const [actionPending, setActionPending] = useState("");

  // Utilities
  const hasChanged = () => {
    let currChosenPost = JSON.parse(JSON.stringify(props.chosenPost.cmsPost));
    let storedPost = JSON.parse(
      JSON.stringify(props.data[props.chosenPost.key])
    );
    delete currChosenPost.lastModified; // moment/firestore objects shouldn't be compared
    delete storedPost.lastModified;
    return !isEqual(currChosenPost, storedPost);
  };

  const isPublished = props.chosenPost.cmsPost.post.isPublished;

  // UI
  const formRef = useRef(null);
  const saveButtonAttribues = hasChanged() ? {} : { disabled: true };

  // Modals
  ////////////////////////////////////////////////

  // Open state
  const [modalOpen, setModalOpen] = useState({
    delete: false,
    saveAndClose: false,
    validation: false,
    publish: false
  });
  function toggleModal(key, isOpen) {
    let modalStates = Object.assign({}, modalOpen);
    modalStates[key] = isOpen;
    setModalOpen(modalStates);
  }

  // Validation
  const [validationErrors, setValidationErrors] = useState([]);
  const closeValidationModal = () => {
    toggleModal("validation", false);
    setValidationErrors([]);
  };

  // Delete
  const openDeleteModal = () => {
    toggleModal("delete", true);
  };
  const closeDeleteModal = () => {
    toggleModal("delete", false);
  };
  const onDeleteModal = () => {
    toggleModal("delete", false);
    setFormDisabled(true);
    setActionPending("delete");
    props.onDelete(() => {
      setFormDisabled(false);
      setActionPending("");
    });
  };

  // Save and Close
  const closeSaveModal = () => {
    toggleModal("saveAndClose", false);
  };
  const onSaveAndClose = () => {
    baseSave(null, back);
  };
  const goBack = () => {
    if (!hasChanged()) {
      back();
    } else {
      toggleModal("saveAndClose", true);
    }
  };
  const back = () => {
    props.setViewAllPosts();
  };

  // Publish
  const closePublishModal = () => {
    toggleModal("publish", false);
  };
  const togglePublish = () => {
    let newPublishStatus = !isPublished;
    if (!validate(newPublishStatus)) {
      return;
    }
    toggleModal("publish", true);
  };
  const publishConfirm = () => {
    toggleModal("publish", false);
    setFormDisabled(true);
    setActionPending("publish");
    let newPublishStatus = !isPublished;
    props.onPublish(newPublishStatus, () => {
      setFormDisabled(false);
      setActionPending("");
    });
  };

  // Functions
  ////////////////////////////////////////////////

  function validate(isPublished) {
    let { valid, validationErrors } = validatePost(
      props.data,
      props.chosenPost,
      formRef,
      isPublished
    );
    if (!valid && validationErrors.length > 0) {
      setValidationErrors(validationErrors);
      toggleModal("validation", true);
    }
    return valid;
  }

  function baseSave(e, onSuccess) {
    if (!validate(isPublished)) {
      return;
    }
    setFormDisabled(true);
    setActionPending("save");
    let doExit = false;
    props.onSave(doExit, () => {
      setFormDisabled(false);
      setActionPending("");
      if (onSuccess) {
        onSuccess();
      }
    });
  }

  function onChange(e) {
    props.onChange(e.currentTarget.dataset.val, e.currentTarget.value);
  }

  return (
    <>
      <ValidationModal
        open={modalOpen.validation}
        handleClose={closeValidationModal}
        errors={validationErrors}
      />
      <DeleteConfirmationModal
        open={modalOpen.delete}
        handleClose={closeDeleteModal}
        onDelete={onDeleteModal}
        isPublished={isPublished}
      />
      <SavePostModal
        open={modalOpen.saveAndClose}
        handleClose={closeSaveModal}
        onNoClick={back}
        onYesClick={onSaveAndClose}
      />
      <PublishModal
        open={modalOpen.publish}
        handleClose={closePublishModal}
        newPublishStatus={!isPublished}
        onConfirm={publishConfirm}
      />

      <BackBtn type="button" className="mb-4" onClick={goBack}>
        &#8592; Back
      </BackBtn>

      <form ref={formRef}>
        <fieldset disabled={formDisabled}>
          <PageMetadataForm chosenPost={props.chosenPost} onChange={onChange} />
          <div className="my-3">
            <FullWidthBtn
              type="button"
              className="my-2 btn btn-success"
              onClick={baseSave}
              {...saveButtonAttribues}
            >
              {actionPending === "save" && <Spinner />}
              Save
            </FullWidthBtn>
            <FullWidthBtn
              type="button"
              className="my-2 btn btn-info"
              onClick={togglePublish}
            >
              {actionPending === "publish" && <Spinner />}
              {isPublished ? "Unpublish" : "Publish"}
            </FullWidthBtn>
            <FullWidthBtn
              type="button"
              onClick={openDeleteModal}
              className="my-2 btn btn-danger"
            >
              {actionPending === "delete" && <Spinner />}
              Delete
            </FullWidthBtn>
          </div>
        </fieldset>
      </form>
    </>
  );
}
