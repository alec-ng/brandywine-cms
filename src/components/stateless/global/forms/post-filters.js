import React, { useState } from 'react';
import ButtonGroup from "../../generic/button-group";

/**
 * Contains inputs to filter cms posts by publish status and a generic text search
 */
export default function PostFilters({ filters, setFilters }) {
  const [textSearch, setTextSearch] = useState('');
  const activeBtnKey = filters.isPublished 
    ? 'published' 
    : typeof(filters.isPublished) === 'undefined'
      ? 'all'
      : 'draft';

  // Updates the "isPublished" filter based on selected button in group
  function onPublishChange(e) {
    const btnKey = e.target.dataset.buttonkey;
    let newFilters = Object.assign({}, filters);
    if (btnKey === 'all') {
      delete newFilters.isPublished;
    } else {
      newFilters.isPublished = btnKey === 'published' ? true : false;
    }
    setFilters(newFilters);
  }

  // Updates the 'text' filter if the input is at least 3 characters. else,
  // removes the filter.
  function onTextChange(e) {
    const trimmedVal = e.target.value.trim();
    setTextSearch(trimmedVal);

    if (!filters.text && trimmedVal.length < 3) {
      return;
    }

    let newFilters = Object.assign({}, filters);
    if (trimmedVal.length < 3) {
      delete newFilters.text;
    } else {
      newFilters.text = trimmedVal;
    }
    setFilters(newFilters);
  }

  return (
    <form>
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">&#128269;</span>
        </div>
        <input 
          type="text" 
          className="form-control" 
          onChange={onTextChange}
          value={textSearch}  
        />
      </div>
      <ButtonGroup
        buttons={buttonGroupData}
        activeKey={activeBtnKey}
        onClick={onPublishChange}
      />
    </form>
  );
}

const buttonGroupData = [
  {
    key: 'all',
    label: "All"
  },
  {
    key: 'published',
    label: "Published"
  },
  {
    key: 'draft',
    label: "Drafts"
  }
];