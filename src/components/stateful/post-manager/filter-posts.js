/**
 * Using the form values from post-filters, returns a subset of cmsPosts based
 * on publish status and case-insensitive text search (contains) on title, grouping,
 * area, region
 */
export default function filterPosts(cmsPosts, filters) {
  if (!filters || !Object.keys(filters)) {
    return cmsPosts;
  }

  const doesExist = (str, toCompare) => 
    toCompare && toCompare.toUpperCase().includes(str);

  return cmsPosts.filter(cmsPost => {      
    let isValid = true;

    if (typeof filters.isPublished !== 'undefined') {
      isValid = isValid && cmsPost.post.isPublished === filters.isPublished;
    }

    if (typeof filters.text !== 'undefined') {
      const textToCompare = filters.text.toUpperCase();
      isValid = isValid && (
        doesExist(textToCompare, cmsPost.post.title) ||  
        doesExist(textToCompare, cmsPost.post.grouping) ||
        doesExist(textToCompare, cmsPost.post.region) ||
        doesExist(textToCompare, cmsPost.post.area) 
      )
    }

    return isValid;
  });
}