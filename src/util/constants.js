/**
 * Collection Definitions
 */
export const COLLECTION_PHOTOGRAPHY = "photography";
export const COLLECTION_TRIPREPORTS = "tripreports";

export const VALID_COLLECTIONS = [
  COLLECTION_PHOTOGRAPHY,
  COLLECTION_TRIPREPORTS
];

export const collectionLabelMap = {
  [COLLECTION_PHOTOGRAPHY]: 'Travel',
  [COLLECTION_TRIPREPORTS]: 'Hiking'
};

export function getIndexRef(collection, firebase) {
  let collectionMap = {};
  collectionMap[COLLECTION_PHOTOGRAPHY] = firebase.photographyIndex();
  collectionMap[COLLECTION_TRIPREPORTS] = firebase.tripreportIndex();
  return collectionMap[collection];
}

/**
 * Collection specific fields for index
 */
export const hikingIndexFields = ['area', 'region'];
