import React from 'react';
import BasePostMetadata from './base-post-metadata';
import ReadonlyMetadata from './readonly-metadata';
import GroupingHikingMetadata from './hiking-metadata';
import { COLLECTION_TRIPREPORTS } from '../../../../util/constants';

function getComponentFromGrouping(grouping) {
  switch (grouping) {
    case COLLECTION_TRIPREPORTS: 
      return GroupingHikingMetadata;
    default: 
      return null;
  }
}

/**
 * Helper to render a form that for all metadata of a given post,
 * or a new post to create given a grouping
 */
export default function PostFormComposer(
  {grouping, cmsPost, onInputChange, showReadOnly}
) {
  const GroupingMetadata = getComponentFromGrouping(grouping);

  return (
    <>
      <BasePostMetadata 
        cmsPost={cmsPost}
        onChange={onInputChange}
      />
      {GroupingMetadata && 
        <GroupingMetadata 
          cmsPost={cmsPost}
          onChange={onInputChange}
        />
      }
      {showReadOnly &&
        <ReadonlyMetadata 
          cmsPost={cmsPost}
          grouping={grouping} 
        />
      }
    </>
  )
}