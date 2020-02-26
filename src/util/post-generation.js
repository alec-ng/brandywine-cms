import { COLLECTION_TRIPREPORTS, hikingIndexFields } from './constants';

// The post key is unique but separate from the database id
// Used to generate a nice looking url path consisting of the date and title
export function generateKey(postDate, postTitle) {
  return `${postDate}-${postTitle}`;
}
export function generateKeyFromPost(post) {
  return `${post.date}-${post.title}`;
}

/**
 * Utility function to trim all key values if they are strings
 */
export function trim(obj) {
  return Object.keys(obj).reduce((newObj, key) => {
    const val = typeof(obj[key]) === 'string' 
      ? obj[key].trim() 
      : obj[key];
    return Object.assign({}, newObj, { [key]: val });
  }, {});
}

/**
 * Creates a document to insert in the cms-post collection
 * newPostValues should be a key value pairing of post fields 
 */
export function generateNewCmsPost(newPostValues, grouping) {
  let cmsPost = {};
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  cmsPost.createdDate = `${yyyy}-${mm}-${dd}`;

  let post = Object.assign({}, newPostValues, {
    key: generateKey(newPostValues.date, newPostValues.title),
    isPublished: false,
    grouping: grouping
  });
  cmsPost.post = post;
  cmsPost.postData = {};

  return cmsPost;
}

/**
 * Creates an an object to insert in the root field of an index specific collection document
 * Contains condensed information about the post for use on home page to save reads
 */
export function generateIndexEntry(post, id, grouping) {
  let baseData = {
    title: post.title,
    date: post.date,
    postDataId: id
  }
  
  const reducer = (fields, field) => Object.assign(
    {}, 
    fields, 
    { [field] : post[field] }
  );
  switch (grouping) {
    case COLLECTION_TRIPREPORTS:
      return Object.assign({}, baseData, hikingIndexFields.reduce(reducer, {}));
    default:
      return baseData;
  }
}