import React from "react";

export default function SelectedPostManager(props) {
  function onPostDelete(e) {
    // "Are you sure" confirmation?
  }

  function publishPost() {}

  return (
    <PageMetadata
      chosenPost={chosenPostMetadata}
      existingIdList={existingIdList}
      onDelete={onPostDelete}
    />
  );
}
