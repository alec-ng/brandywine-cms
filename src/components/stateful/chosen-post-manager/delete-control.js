import React from "react";
import { StretchBtn } from '../../stateless/generic/util';
import { openModal } from '../../../state/actions';
import { deletePost } from '../../../state/actions/async-actions';

/**
 * Encapsulated delete functionality
 */
export default function DeleteControl({
  chosenPost, 
  dispatch, 
  firebase
}) {

  function openDeleteModal() {
    // if current Post is published, show validation error
    if (chosenPost.post.isPublished) {
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

  return (
    <StretchBtn
      type="button"
      onClick={openDeleteModal}
      className="my-2 btn btn-danger"
    >
      Delete
    </StretchBtn>
  );

}