import React from "react";
import FormInputWrapper from '../../universal/form-input-wrapper';

export default function GroupingHikingMetadata({onChange, cmsPost}) {
  return (
    <>
      <FormInputWrapper>
        Region
        <input
          required
          pattern="[a-zA-Z0-9\s]+"
          onChange={onChange}
          minLength="3"
          maxLength="50"
          data-val="region"
          type="text"
          defaultValue={cmsPost ? cmsPost.post.region : null}
          className="form-control"
        />
      </FormInputWrapper>
      <FormInputWrapper>
        Area
        <input
          required
          pattern="[a-zA-Z0-9\s]+"
          onChange={onChange}
          minLength="3"
          maxLength="50"
          data-val="area"
          type="text"
          defaultValue={cmsPost ? cmsPost.post.area : null}
          className="form-control"
        />
      </FormInputWrapper>
    </>
  );
}