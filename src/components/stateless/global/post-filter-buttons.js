import React from 'react';
import ButtonGroup from "../universal/button-group";
import { ALL_POSTS, PUBLISHED_POSTS, DRAFT_POSTS } from '../../../hooks/useFilteredData';

export default function PostFilterButtons({activeKey, onClick}) {
  return (
    <ButtonGroup
      buttons={buttonGroupData}
      activeKey={activeKey}
      onClick={onClick}
    />
  );
}

const buttonGroupData = [
  {
    key: ALL_POSTS,
    label: "All"
  },
  {
    key: PUBLISHED_POSTS,
    label: "Published"
  },
  {
    key: DRAFT_POSTS,
    label: "Drafts"
  }
];