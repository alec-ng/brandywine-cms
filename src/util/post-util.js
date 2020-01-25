// index collection names
export const PHOTOGRAPHY_KEY = "photography";
export const TRIPREPORT_KEY = "tripreports";
export const GROUPING_KEYS = [PHOTOGRAPHY_KEY, TRIPREPORT_KEY];

// The post key is unique but separate from the database id
// Used to generate a nice looking url path consisting of the date and title
export function generateKey(postDate, postTitle) {
  return `${postDate}-${postTitle}`;
}
export function generateKeyFromPost(post) {
  return `${post.date}-${post.title}`;
}

// Used to generate a new cms-post document when a new post is created.
export function generateNewCmsPost(postDate, postTitle, grouping) {
  let cmsPost = {};
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  cmsPost.createdDate = `${yyyy}-${mm}-${dd}`;

  let post = {
    title: postTitle,
    date: postDate,
    key: generateKey(postDate, postTitle),
    isPublished: false,
    grouping: grouping
  };

  cmsPost.post = post;
  cmsPost.postData = {};

  return cmsPost;
}

// returns {valid=bool, validationErrors=[]}
// expects data,chosenPost from state and form Ref
export function validatePost(data, chosenPost, formRef, isPublished) {
  const existingIdList = Object.keys(data).map(id =>
    data[id].post.key.toUpperCase()
  );
  let validationErrors = [];

  // html5 form input validation
  let isValid = formRef.current.reportValidity();
  if (!isValid) {
    return {
      valid: false,
      validationErrors: validationErrors
    };
  }

  // ensure date/tite combo is unique and valid
  let currKey = generateKeyFromPost(chosenPost.cmsPost.post);
  let hasDuplicateKey =
    data[chosenPost.key].post.key !== currKey &&
    existingIdList.indexOf(currKey.toUpperCase()) !== -1;
  if (hasDuplicateKey) {
    validationErrors.push(VALIDATION_MESSAGES.UNIQUE_KEY);
  }

  // terminate early for drafts
  if (!isPublished) {
    return {
      valid: validationErrors.length === 0,
      validationErrors: validationErrors
    };
  }

  // validate blocks[] is not empty
  let isContentPresent =
    chosenPost.cmsPost.postData.blocks &&
    chosenPost.cmsPost.postData.blocks.length > 0;
  if (!isContentPresent) {
    validationErrors.push(VALIDATION_MESSAGES.EMPTY_CONTENT);
  }

  // validate header.title is not empty
  let isHeaderPresent =
    chosenPost.cmsPost.postData.header &&
    chosenPost.cmsPost.postData.header.title.length > 0;
  if (!isHeaderPresent) {
    validationErrors.push(VALIDATION_MESSAGES.EMPTY_HEADER);
  }

  return {
    valid: validationErrors.length === 0,
    validationErrors: validationErrors
  };
}

const VALIDATION_MESSAGES = {
  EMPTY_CONTENT: `Your post must have at least one block to show. 
    Drag and drop a plugin on the editor canvas.`,
  EMPTY_HEADER: `A title is required. Provide a title under the "Page Header" section.`,
  UNIQUE_KEY: `The title/date combination you provided already exists. Provide either 
    a different date or title.`
};
