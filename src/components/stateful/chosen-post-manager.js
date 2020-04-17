import React, { useRef } from "react";
import { connect } from 'react-redux';
import styled from "styled-components";

import { withFirebase } from './../hoc/firebase';
import useHasChanged from '../../hooks/useHasChanged';
import Slug from '../../modules/slug';
import { openModal, closeModal, updateMetadata, close } from '../../state/actions';
import { selectPendingStatus } from '../../state/selectors';
import { 
  deletePost, publishPost, unpublishPost, savePost, SAVE_CURRENT_POST
} from '../../state/actions/async-actions';


import MetadataForm from "../stateless/global/forms/metadata-form";
import Spinner from "../stateless/generic/spinner";

const BackBtn = styled.button`
  border: none;
  position: absolute;
  background: none;
  padding: 0;
  color: inherit;
  top: 17px;
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
  const dictValue = data[chosenPost.post.postDataId];
  const hasChanged = useHasChanged(chosenPost, dictValue);
  const formRef = useRef(null);
  // Helpers
  const isPublished = chosenPost.post.isPublished;
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
      deletePost(firebase, chosenPost)
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
    dispatch(
      publishPost(firebase, chosenPost)
    ).catch(err => { console.error(err) });
  }
  
  function unpublishConfirm() {
    dispatch(
      unpublishPost(firebase, chosenPost)
    ).catch(err => { console.error(err) });
  }

  // SAVE
  ////////////////////////////////////////////////
 
  function save(e, closePostAfterCompletion = false) {
    if (!validate(isPublished)) {
      return;
    }
    dispatch(
      savePost(firebase, chosenPost)
    ).then(() => {
      if (closePostAfterCompletion) {
        dispatch(close());
      }
    }).catch(err => { console.error(err) });
  }

  /*
   * Validates HTML form, slug uniqueness, publish logic
   */
  function validate(willPublish) {
    if (!formRef.current.reportValidity()) {
      return false;
    }
    
    // Basic empty check before specialized validation logic
    let errs = chosenPost.post.validateBaseProps();
    if (!errs.length) {
      const isValidSlug = Slug.validateUniqueAndChanged(chosenPost, data);
      if (!isValidSlug) {
        errs.push('The slug already exists for the given date/title.')
      }
      if (willPublish) {
        errs = errs.concat(chosenPost.publishValidation());
      }
    }

    if (errs.length) {
      dispatch(openModal('validationError', {errors: errs}));
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
    dispatch(updateMetadata(e.target.name, e.target.value));
  }

  return (
    <>
      <BackBtn type="button" onClick={goBack}>
        &#8592; Posts
      </BackBtn>

      <form ref={formRef}>
        <fieldset disabled={savePending}>
          <MetadataForm
            onInputChange={onMetadataChange}
            cmsPost={chosenPost}
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
