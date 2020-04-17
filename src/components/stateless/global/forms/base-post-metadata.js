import React from "react";
import FormInputWrapper from '../../generic/form-input-wrapper';
import Constants from '../../../../util/constants';

/**
 * Renders post properties common to posts across all groupings
 * If a change handler and cmsPost is given, bind them to the inputs
 */
export const strFieldList = ['title', 'date', 'grouping']

export default function BasePostMetadata({ onChange, values }) {
  return (
    <>
      <FormInputWrapper>
        Title
        <input
          name="title"
          type="text"
          required
          onChange={onChange}
          minLength="3"
          maxLength="50"
          pattern="[a-zA-Z0-9\s']+"
          value={values.title}
          className="form-control"
        />
      </FormInputWrapper>
      <FormInputWrapper>
        Date
        <input
          name="date"
          type="date"
          required
          onChange={onChange}
          value={values.date}
          className="form-control"
        />
      </FormInputWrapper>
      <FormInputWrapper>
        Grouping
        <select 
          name="grouping"
          onChange={onChange}
          required
          value={values.grouping}
          className="form-control"
        >
          <option value="">--Select an Option--</option>
          {
            Object.keys(Constants.POST_GROUPINGS).map(
              key => 
                <option key={key}>
                  {Constants.POST_GROUPINGS[key]}
                </option>
            )
          }
        </select>
      </FormInputWrapper>
    </>
  );
}