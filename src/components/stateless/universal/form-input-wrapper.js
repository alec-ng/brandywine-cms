import React from 'react';

export default function FormInputWrapper({children}) {
  return (
    <div className="form-group">
      <label style={{width: '100%'}}>
        {children}
      </label>
    </div>
  )
}