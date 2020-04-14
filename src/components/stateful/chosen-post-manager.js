import React, { useRef } from "react";
import { connect } from 'react-redux';
import styled from "styled-components";

import { withFirebase } from './../hoc/firebase';
import useHasChanged from '../../hooks/useHasChanged';

import { generateIndexEntry } from '../../util/post-generation';
import { openModal, closeModal, updateMetadata, close } from '../../state/actions';
import { selectPendingStatus } from '../../state/selectors';
import { 
  deletePost, publishPost, unpublishPost, savePost, SAVE_CURRENT_POST
} from '../../state/actions/data-actions';

import MetadataForm from "../stateless/global/forms/metadata-form";
import { validatePost } from "../../util/post-validation";
import Spinner from "../stateless/generic/spinner";

const BackBtn = styled.button`
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.75);
  color: rgba(255, 255, 255, 0.75);
  border-radius: 3px;
  padding: 5px 10px;
`;
const FullWidthBtn = styled.button`
  width: 100%;
`;

/**
 * Component manager for toolbar view when a post is selected
 */
function ChosenPostManager({
  data, 
  chosenPost, 
  savePending, 
  dispatch, 
  firebase
}) {
  
  // Hooks
  const hasChanged = useHasChanged(chosenPost.cmsPost, data[chosenPost.key]);
  const formRef = useRef(null);
  // Helpers
  const isPublished = chosenPost.cmsPost.post.isPublished;
  const saveButtonAttribues = hasChanged ? {} : { disabled: true };
  

  // DELETE
  ////////////////////////////////////////////////

  function openDeleteModal() {
    // if current Post is published, show validation error
    if (isPublished) {
      const errors = ['You cannot delete a published post. Unpublish the post first.'];
      dispatch(openModal('validationError', { errors: errors }));
    } else {
      dispatch(openModal('delete', { onDelete: removePost }));
    }
  }
  function removePost() {
    dispatch(
      deletePost(firebase, chosenPost.key, chosenPost.cmsPost.post.title)
    ).catch(err => { console.error(err); });
  };

  // PUBLISH/UNPUBLISH
  ////////////////////////////////////////////////

  function togglePublishModal() {
    let newPublishStatus = !isPublished;
    if (!validate(newPublishStatus)) {
      return;
    }
    const modalType = newPublishStatus ? 'publish' : 'unpublish';
    const confirmationFct = newPublishStatus ? publishConfirm : unpublishConfirm;
    dispatch(openModal(modalType, { onConfirm: confirmationFct }));
  }
  function publishConfirm() {
    const indexEntry = generateIndexEntry(chosenPost.cmsPost.post, chosenPost.key);
    dispatch(
      publishPost(firebase, chosenPost.key, chosenPost.cmsPost, indexEntry)
    ).catch(err => { console.error(err) });
  }
  function unpublishConfirm() {
    dispatch(
      unpublishPost(firebase, chosenPost.key, chosenPost.cmsPost)
    ).catch(err => { console.error(err) });
  }

  // SAVE
  ////////////////////////////////////////////////
 
  function save(e, closePostAfterCompletion = false) {
    if (!validate(isPublished)) {
      return;
    }
    let indexEntry;
    if (isPublished) {
      indexEntry = generateIndexEntry(chosenPost.cmsPost.post, chosenPost.key);
    }
    dispatch(
      savePost(firebase, chosenPost.key, chosenPost.cmsPost, indexEntry)
    ).then(() => {
      if (closePostAfterCompletion) {
        dispatch(close());
      }
    }).catch(err => { console.error(err) });
  }

  function validate(publishStatus) {
    if (!formRef.current.reportValidity()) {
      return false;
    }
    const { valid, validationErrors } = validatePost(data, chosenPost, publishStatus);
    if (!valid) {
      if (validationErrors.length > 0) {
        dispatch(openModal('validationError', {errors: validationErrors}));
      }
      return false;
    }
    return true;
  }

  // MISC
  ////////////////////////////////////////////////

  function goBack() {
    if (!hasChanged) {
      dispatch(close());
    } else {
      const onSaveAndClose = () => { save(undefined, true) }
      dispatch(openModal('unsavedChanges', {
        onExit: closeCurrentPost,
        onSave: onSaveAndClose  
      }));
    }
  }

  function closeCurrentPost() {
    dispatch(close());
    dispatch(closeModal());
  }
  
  function onMetadataChange(e) {
    dispatch(
      updateMetadata(e.currentTarget.name, e.currentTarget.value)
    )
  }

  return (
    <>
      <BackBtn type="button" className="mb-4" onClick={goBack}>
        &#8592; Back
      </BackBtn>

      <form ref={formRef}>
        <fieldset disabled={savePending}>
          <MetadataForm
            onInputChange={onMetadataChange}
            cmsPost={chosenPost.cmsPost}
          />
          <div className="my-3">
            <FullWidthBtn
              type="button"
              className="my-2 btn btn-success"
              onClick={save}
              {...saveButtonAttribues}
            >
              {savePending && <Spinner />}
              Save
            </FullWidthBtn>
            <FullWidthBtn
              type="button"
              className="my-2 btn btn-info"
              onClick={togglePublishModal}
            >
              {isPublished ? "Unpublish" : "Publish"}
            </FullWidthBtn>
            <FullWidthBtn
              type="button"
              onClick={openDeleteModal}
              className="my-2 btn btn-danger"
            >
              Delete
            </FullWidthBtn>
          </div>
        </fieldset>
      </form>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    chosenPost: state.chosenPost,
    data: state.data,
    savePending: selectPendingStatus(state, SAVE_CURRENT_POST)
  }
}
export default connect(mapStateToProps)(withFirebase(ChosenPostManager));
