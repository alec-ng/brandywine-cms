import React from 'react';
import BasePostMetadata from './base-post-metadata';
import ReadonlyMetadata from './readonly-metadata';
import GroupingHikingMetadata from './hiking-metadata';

/**
 * Helper to render a form that for all metadata of a given post,
 * or a new post to create given a grouping
 */
export default function PostFormComposer({
  cmsPost, 
  onInputChange, 
  showReadOnly
}) {
  return (
    <>
      <BasePostMetadata 
        cmsPost={cmsPost}
        onChange={onInputChange}
      />
      <GroupingHikingMetadata 
        cmsPost={cmsPost}
        onChange={onInputChange}
      />
      {showReadOnly &&
        <ReadonlyMetadata cmsPost={cmsPost} />
      }
    </>
  )
}