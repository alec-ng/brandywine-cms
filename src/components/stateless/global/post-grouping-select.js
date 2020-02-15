import React from "react";
import { getGroupingMap } from "../../../util/constants";

export default function PostGroupingSelect(
  {defaultValue, onChange, disabled=false}
) {
  const groupingMapping = getGroupingMap();
  
  let optionsList = Object.keys(groupingMapping).map(grouping => {
    const label = groupingMapping[grouping];
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
