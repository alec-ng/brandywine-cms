import React from "react";
import FormInputWrapper from '../../universal/form-input-wrapper';

/**
 * Renders post properties common to posts across all groupings
 * If a change handler and cmsPost is given, bind them to the inputs
 */
export default function BasePostMetadata({onChange, cmsPost}) {
  return (
    <>
      <FormInputWrapper>
        Title
        <input
          required
          onChange={onChange}
          minLength="3"
          maxLength="50"
          data-val="title"
          pattern="[a-zA-Z0-9\s]+"
          type="text"
          defaultValue={cmsPost ? cmsPost.post.title : null}
          className="form-control"
        />
      </FormInputWrapper>
      <FormInputWrapper>
        Date
        <input
          defaultValue={cmsPost ? cmsPost.post.date : null}
          onChange={onChange}
          required
          className="form-control"
          type="date"
          data-val="date"
        />
      </FormInputWrapper>
    </>
  );
}