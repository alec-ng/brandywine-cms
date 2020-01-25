export const COLLECTION_PHOTOGRAPHY = "photography";
export const COLLECTION_TRIPREPORTS = "tripreports";

export const VALID_COLLECTIONS = [
  COLLECTION_PHOTOGRAPHY,
  COLLECTION_TRIPREPORTS
];

export const PATH_BLOG = "/blog";

export function getIndexRef(collection, firebase) {
  const collectionMap = {
    photography: firebase.photographyIndex(),
    tripreports: firebase.tripreportIndex()
  };
  return collectionMap[collection];
}
