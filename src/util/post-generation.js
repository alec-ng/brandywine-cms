export const ERR_SLUG_NON_UNIQUE = `
  The slug created from the date and title is not unique. 
`;

/**
 * Returns case insensitive slug 
 */
export function getSlug(date, title) {
  return (!date || !date.trim() || !title || !title.trim())
    ? null
    : `${date}-${title}`.toUpperCase();
}

export function getSlugFromMetadata(metadata) {
  const { date, title } = metadata;
  return getSlug(date, title);
}

/**
 * For an existing CMSPost, ensure that if its key has changed,
 * it's still unique in the dictionary
 */
export function validatePostSlug(chosenPost, dataDictionary) {
  const id = chosenPost.post.postDataId;
  const storeKey = dataDictionary[id].post.slug;

  return chosenPost.post.slug !== storeKey
    ? validateSlug(chosenPost.post, Object.values(dataDictionary))
    : true;
}

/**
 * For a PostData instance, ensure its slug is unique among
 * the existing cms posts
 */
export function validateSlug(metadata, cmsPosts) {
  const slugList = Object.keys(cmsPosts).map(id =>
      cmsPosts[id].post.slug
  );
  const newSlug = getSlugFromMetadata(metadata)
  return slugList.indexOf(newSlug) === -1;
}
