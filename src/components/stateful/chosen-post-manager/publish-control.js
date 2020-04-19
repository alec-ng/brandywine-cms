import React from "react";
import { StretchBtn } from "../../stateless/generic/util";
import { openModal } from "../../../state/actions";
import {
  publishPost,
  unpublishPost
} from "../../../state/actions/async-actions";

/**
 * Encapsulated publish functionality
 */
export default function PublishControl({
  chosenPost,
  dispatch,
  firebase,
  setHasChanged,
  validate
}) {
  const isPublished = chosenPost.post.isPublished;

  function togglePublishModal() {
    let newPublishStatus = !isPublished;
    if (!validate(newPublishStatus)) {
      return;
    }
    const modalType = newPublishStatus ? "publish" : "unpublish";
    const confirmationFct = newPublishStatus
      ? publishConfirm
      : unpublishConfirm;
    dispatch(openModal(modalType, { onConfirm: confirmationFct }));
  }

  const resetChangeFlag = () => {
    setHasChanged(false);
  };

  function publishConfirm() {
    dispatch(publishPost(firebase, chosenPost))
      .then(resetChangeFlag)
      .catch(err => {
        console.error(err);
      });
  }

  function unpublishConfirm() {
    dispatch(unpublishPost(firebase, chosenPost))
      .then(resetChangeFlag)
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <StretchBtn
      type="button"
      className="my-2 btn btn-info"
      onClick={togglePublishModal}
    >
      {isPublished ? "Unpublish" : "Publish"}
    </StretchBtn>
  );
}
