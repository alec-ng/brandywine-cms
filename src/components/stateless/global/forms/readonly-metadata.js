import React from "react";
import moment from "moment";
import FormInputWrapper from '../../universal/form-input-wrapper';

const datetimeFormat = "YYYY-MM-DD h:mm a";

/**
 * Renders readonly inputs for post properties that cannot be modified by the user
 */
export default function ReadonlyMetadata({ cmsPost }) {
  let lastModified = cmsPost.lastModified;
  let lastModifiedStr;
  if (!lastModified) {
    lastModifiedStr = "N/A";
  } else if (typeof lastModified === "string") {
    // ISO 8601 string from moment object being stringified
    lastModifiedStr = moment(lastModified).format(datetimeFormat);
  } else {
    lastModifiedStr = moment.isMoment(lastModified)
      ? lastModified.format(datetimeFormat) // most recently saved with moment object
      : moment.unix(lastModified.seconds).format(datetimeFormat); // firestore value
  }

  return (
    <>
    <FormInputWrapper>
        Grouping
        <input
          style={{ color: "white" }}
          defaultValue={cmsPost.post.grouping}
          disabled
          readOnly
          className="form-control-plaintext"
          type="text"
        />
      </FormInputWrapper>
      <FormInputWrapper>
        Created
        <input
          style={{ color: "white" }}
          defaultValue={cmsPost.createdDate}
          disabled
          readOnly
          className="form-control-plaintext"
          type="text"
        />
      </FormInputWrapper>
      <FormInputWrapper>
        Last Modified
        <input
          style={{ color: "white" }}
          defaultValue={lastModifiedStr}
          disabled
          readOnly
          className="form-control-plaintext"
          type="text"
        />
      </FormInputWrapper>
    </>
  );
}