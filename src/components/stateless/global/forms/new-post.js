import React, { forwardRef } from 'react';
import FormInputWrapper from '../../universal/form-input-wrapper';

const NewPostForm = forwardRef(( { isLocked, validationErrors=[] }, ref ) => {
  return (
    <form ref={ref}>
      <fieldset disabled={isLocked}>
        <FormInputWrapper>  
          Title
          <input
            required
            minLength="3"
            maxLength="50"
            data-val="title"
            pattern="[a-zA-Z0-9\s]+"
            type="text"
            className="form-control"
          />
        </FormInputWrapper>
        <FormInputWrapper>
          Date
          <input
            required
            type="date"
            data-val="date"
            className="form-control"
          />
        </FormInputWrapper>

        {validationErrors.length > 0 && (
          <div className="text-center mb-4" style={{ color: "red" }}>
            {validationErrors.map((error, i) => 
              <p key={i}>{error}</p>  
            )}
          
          </div>
        )}      
      </fieldset>
    </form>
  );
});
export default NewPostForm;
