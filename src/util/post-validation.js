import { generateKeyFromPost, generateKey } from './post-generation';

/**
 * returns {valid=bool, validationErrors=[]}
 * data should be a slice of the state property for just the current post group
 */
export function validatePost(data, chosenPost, isPublished) {
  let validationErrors = [];
  const generateValidationResult = function(validationErrors) {
    return {
      valid: validationErrors.length === 0,
      validationErrors: validationErrors
    }
  }
  // minimal validation for all posts
  validationErrors.push(...validatePostMetadata(chosenPost, data));
  // terminate early for drafts
  if (!isPublished) {
    return generateValidationResult(validationErrors);
  }
  // validation for published post
  validationErrors.push(...validatePostData(chosenPost));
  return generateValidationResult(validationErrors);
}

/**
 * When creating a new post, ensure that its key is unique across all posts in the same grouping
 */
export function validateNewPost(title, date, postGroup, data) {
  let errors = [];
  const existingIdList = Object.keys(data).map(id =>
    data[id].post.key.toUpperCase()
  );
  const newKey = generateKey(date, title);
  if (existingIdList.indexOf(newKey.toUpperCase()) !== -1) {
    errors.push(VALIDATION_MESSAGES.UNIQUE_KEY);
  }

  return errors;
}

/**
 * Given the chosen post and a slice of the data corresponding to the grouping of the chosen post,
 * ensure its uniqueness
 */
function validatePostMetadata(chosenPost, data) {
  let errors = [];

  const existingIdList = Object.keys(data).map(id =>
    data[id].post.key.toUpperCase()
  );
  let currKey = generateKeyFromPost(chosenPost.cmsPost.post);
  const hasDuplicateKey =
    data[chosenPost.key].post.key !== currKey &&
    existingIdList.indexOf(currKey.toUpperCase()) !== -1;
  if (hasDuplicateKey) {
    errors.push(VALIDATION_MESSAGES.UNIQUE_KEY);
  }

  return errors;
}

/**
 * Ensure that the actual post content meets some minimal standard
 */
function validatePostData(chosenPost) {
  let errors = [];

  // validate blocks[] is not empty
  let isContentPresent =
    chosenPost.cmsPost.postData.blocks &&
    chosenPost.cmsPost.postData.blocks.length > 0;
  if (!isContentPresent) {
    errors.push(VALIDATION_MESSAGES.EMPTY_CONTENT);
  }

  // validate header.title is not empty
  let isHeaderPresent =
    chosenPost.cmsPost.postData.header &&
    chosenPost.cmsPost.postData.header.title.length > 0;
  if (!isHeaderPresent) {
    errors.push(VALIDATION_MESSAGES.EMPTY_HEADER);
  }

  return errors;
}

const VALIDATION_MESSAGES = {
  EMPTY_CONTENT: `Your post must have at least one block to show. 
    Drag and drop a plugin on the editor canvas.`,
  EMPTY_HEADER: `A title is required. Provide a title under the "Page Header" section.`,
  UNIQUE_KEY: `The title/date combination you provided already exists. Provide either 
    a different date or title.`
};