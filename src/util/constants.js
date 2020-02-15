export const COLLECTION_PHOTOGRAPHY = "photography";
export const COLLECTION_TRIPREPORTS = "tripreports";

export function getGroupingMap() {
  let groupingMap = {};
  groupingMap[COLLECTION_PHOTOGRAPHY] = 'Travel';
  groupingMap[COLLECTION_TRIPREPORTS] = 'Hiking';
  return groupingMap;
}

export const VALID_COLLECTIONS = [
  COLLECTION_PHOTOGRAPHY,
  COLLECTION_TRIPREPORTS
];

export function getIndexRef(collection, firebase) {
  let collectionMap = {};
  collectionMap[COLLECTION_PHOTOGRAPHY] = firebase.photographyIndex();
  collectionMap[COLLECTION_TRIPREPORTS] = firebase.tripreportIndex();
  return collectionMap[collection];
}
