import React, { useRef } from "react";
import { connect } from 'react-redux';
import styled from "styled-components";

import { withFirebase } from './../hoc/firebase';
import useHasChanged from '../../hooks/useHasChanged';

import { openModal, closeModal, updateMetadata, close } from '../../state/actions';
import { selectCurrentDataSlice, selectPendingStatus } from '../../state/selectors';
import { 
  deletePost, publishPost, unpublishPost, savePost, SAVE_CURRENT_POST
} from '../../state/actions/data-actions';

import PageMetadataForm from "../stateless/global/page-metadata-form";
import { validatePost } from "../../util/post-validation";
import Spinner from "../stateless/universal/spinner";

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
function ChosenPostManager({
  data, grouping, chosenPost, savePending, dispatch, firebase
}) {
  
  const hasChanged = useHasChanged(chosenPost.cmsPost, data[chosenPost.key]);
  const isPublished = chosenPost.cmsPost.post.isPublished;
  const formRef = useRef(null);
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
    const { valid, validationErrors } = validatePost(
      data,
      chosenPost,
      formRef,
      newPublishStatus
    );
    if (!valid) {
      dispatch(openModal('validationError', { errors: validationErrors }));
      return;
    } 
    const modalType = newPublishStatus ? 'publish' : 'unpublish';
    const confirmationFct = newPublishStatus ? publishConfirm : unpublishConfirm;
    dispatch(openModal(modalType, { onConfirm: confirmationFct }));
  }
  function publishConfirm() {
    dispatch(
      publishPost(firebase, chosenPost.key, chosenPost.cmsPost, grouping)
    ).catch(err => { console.error(err) });
  }
  function unpublishConfirm() {
    dispatch(
      unpublishPost(firebase, chosenPost.key, chosenPost.cmsPost, grouping)
    ).catch(err => { console.error(err) });
  }

  // SAVE
  ////////////////////////////////////////////////
 
  function save(e, closePostAfterCompletion = false) {
    if (validate()) {
      dispatch(
        savePost(firebase, chosenPost.key, chosenPost.cmsPost, grouping)
      ).then(function() {
        if (closePostAfterCompletion) {
          dispatch(close());
        }
      }).catch(err => { console.error(err) });
    }
  }

  function validate() {
    if (!formRef.current.reportValidity()) {
      return false;
    }
    const { valid, validationErrors } = validatePost(
      data, chosenPost, isPublished
    );
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
  
  function onPostMetadataChange(e) {
    dispatch(
      updateMetadata(e.currentTarget.dataset.val, e.currentTarget.value)
    )
  }

  return (
    <>
      <BackBtn type="button" className="mb-4" onClick={goBack}>
        &#8592; Back
      </BackBtn>

      <form ref={formRef}>
        <fieldset disabled={savePending}>
          <PageMetadataForm chosenPost={chosenPost} onChange={onPostMetadataChange} />
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
    data: selectCurrentDataSlice(state),
    grouping: state.postGroup,
    savePending: selectPendingStatus(state, SAVE_CURRENT_POST)
  }
}
export default connect(mapStateToProps)(withFirebase(ChosenPostManager));
