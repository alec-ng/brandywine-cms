
/**
 * Generation/validation logic for post slugs
 */
const Slug = {
  ERR_SLUG_NON_UNIQUE: `
    The slug created from the date and title is not unique. 
  `,

  /**
   * Returns case insensitive slug 
   */
  create: function(date, title) {
    return (!date || !date.trim() || !title || !title.trim())
      ? null
      : `${date}-${title}`.toUpperCase();
  },

  createFromMetadata: function(metadata) {
    const { date, title } = metadata;
    return this.create(date, title);
  },

  /**
   * For an existing CMSPost, ensure that if its key has changed,
   * it's still unique in the dictionary
   */
  validateUniqueAndChanged: function(chosenPost, dataDictionary) {
    const id = chosenPost.post.postDataId;
    const storeKey = dataDictionary[id].post.slug;

    return chosenPost.post.slug !== storeKey
      ? this.validateUnique(chosenPost.post, Object.values(dataDictionary))
      : true;
  },

  /**
   * For a PostData instance, ensure its slug is unique among
   * the existing cms posts
   */
  validateUnique: function(metadata, cmsPosts) {
    const slugList = Object.keys(cmsPosts).map(id =>
        cmsPosts[id].post.slug
    );
    const newSlug = this.createFromMetadata(metadata)
    return slugList.indexOf(newSlug) === -1;
  }
}

export default Slug;