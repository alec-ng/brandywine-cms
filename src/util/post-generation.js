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