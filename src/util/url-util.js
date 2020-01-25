import { PATH_BLOG } from "./constants";

// Given an array element from postIndex.index, generate a unique pathname
// used for redirect
export function getPathnameFromIndex(postIndexElement, collection) {
  if (!postIndexElement || !postIndexElement.title || !postIndexElement.date) {
    console.error(`Invalid post index element provided: ${postIndexElement}`);
    return;
  }
  // title restrictions = alphanumeric and spaces
  // just convert spaces to hyphens to make it url friendly
  let title = postIndexElement.title.trim().replace(/ /g, "-");

  return `${PATH_BLOG}/${collection}/${postIndexElement.date}/${title}`;
}

// Given an array element from postIndex.index, generate a key from its
// date and title used for internal id purposes
export function getKeyFromIndex(postIndexElement) {
  if (!postIndexElement || !postIndexElement.title || !postIndexElement.date) {
    console.error(`Invalid post index element provided: ${postIndexElement}`);
    return;
  }
  return `${postIndexElement.date}-${postIndexElement.title}`;
}
