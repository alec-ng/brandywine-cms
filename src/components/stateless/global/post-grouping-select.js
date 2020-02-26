import React from "react";
import { collectionLabelMap } from "../../../util/constants";

export default function PostGroupingSelect(
  {defaultValue, onChange, disabled=false}
) {  
  let optionsList = Object.keys(collectionLabelMap).map(grouping => {
    const label = collectionLabelMap[grouping];
    return (
      <option value={grouping} key={grouping}>
        {label}
      </option>  
    );
  });
  
  if (!defaultValue) {
    optionsList = [
      <option key="nullKey" defaultValue="">
        -- Select a post grouping --
      </option>
    ].concat(optionsList);
  }

  return (
    <select
      className="form-control"
      onChange={onChange}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      {optionsList}
    </select>
  );
}
