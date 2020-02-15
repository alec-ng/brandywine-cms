import { useEffect, useState } from 'react';

export const ALL_POSTS = "ALL_POSTS";
export const PUBLISHED_POSTS = "PUBLISHED_POSTS";
export const DRAFT_POSTS = "DRAFT_POSTS";

export default function useFilteredData(data = {}, filter = ALL_POSTS) {
  const [filteredData, setFilteredData] = useState({});
  const stringifiedData = JSON.stringify(data);

  useEffect(() => {
    const rebuiltData = JSON.parse(stringifiedData);

    if (filter === ALL_POSTS) {
      setFilteredData(rebuiltData);
      return;
    }
    Object.keys(rebuiltData).forEach(key => {
      let deleteUnpublished =
        filter === PUBLISHED_POSTS && !rebuiltData[key].post.isPublished;
      let deletePublished =
        filter === DRAFT_POSTS && rebuiltData[key].post.isPublished;
      if (deleteUnpublished || deletePublished) {
        delete rebuiltData[key];
      }
    });
    setFilteredData(rebuiltData);
  }, [stringifiedData, filter]);

  return filteredData;
}