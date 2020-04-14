import React from 'react';
import BasePostMetadata from './base-post-metadata';
import ReadonlyMetadata from './readonly-metadata';
import LocationMetadata from './location-metadata';

/**
 * Helper to render a form for all of a post's metadata
 */
export default function MetadataForm({ cmsPost, onInputChange }) {
  return (
    <>
      <BasePostMetadata 
        values={cmsPost.post}
        onChange={onInputChange}
      />
      <LocationMetadata 
        values={cmsPost.post}
        onChange={onInputChange}
      />
      <ReadonlyMetadata cmsPost={cmsPost} />
    </>
  )
}