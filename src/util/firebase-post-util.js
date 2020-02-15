import { getIndexRef } from './constants';

/**
 * Collections: cms-post
 * Filter by: post.grouping
 */
export function getCMSPostsByGrouping(grouping, firebase) {
  return new Promise((resolve, reject) => {
    firebase
      .cmsPosts()
      .where("post.grouping", "==", grouping)
      .get()
      .then(snapshot => { 
        let mapping = {};
        snapshot.forEach(doc => {
          mapping[doc.id] = doc.data();
        });
        resolve({
          grouping: grouping,
          data: mapping
        }); 
      })
      .catch(error => { reject(error) });
  });
}

/**
 * Collections: cms-post, posts, postData
 * For one post, delete documents in all related collections
 */
export function remove(id, firebase) {
  let batch = firebase.batch();
  batch.delete(firebase.cmsPosts().doc(id));
  batch.delete(firebase.posts().doc(id));
  batch.delete(firebase.postData().doc(id));
  return new Promise((resolve, reject) => {
    batch
      .commit()
      .then(() => {
        resolve({ id: id });
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * Collections: {postGrouping}-index, cms-posts, posts, postData
 * Update cms-pots, posts, postData values.
 * For the postGroup specific index collection, update with new post
 */
export function publish(firebase, id, cmsPost, grouping) {
  let localCmsPost = JSON.parse(JSON.stringify(cmsPost));
  localCmsPost.post.isPublished = true;
  localCmsPost.lastModified = firebase.timestamp();

  return new Promise((resolve, reject) => {
    firebase.runTransaction(transaction => {
      let indexCollection = getIndexRef(grouping, firebase);
      return transaction
        .get(indexCollection)
        .then(postIndex => {
          let index = postIndex.data().index || [];
          index.push({
            title: localCmsPost.post.title,
            date: localCmsPost.post.date,
            postDataId: id
          });
          transaction.update(indexCollection, { index: index });
        })
        .then(() => {
          transaction.update(firebase.cmsPosts().doc(id), localCmsPost);
        })
        .then(() => {
          transaction.update(firebase.posts().doc(id), localCmsPost.post);
        })
        .then(() => {
          transaction.update(
            firebase.postData().doc(id),
            localCmsPost.postData
          );
        })
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}

/**
 * Collections: {postGroup}-index, cms-post, post, postData
 * Remove entry from index collection and update cmspost, post, postData
 */
export function unpublish(firebase, id, cmsPost, grouping) {
  let localCmsPost = JSON.parse(JSON.stringify(cmsPost));
  localCmsPost.post.isPublished = false;
  localCmsPost.lastModified = firebase.timestamp();

  return new Promise((resolve, reject) => {
    firebase.runTransaction(transaction => {
      let indexCollection = getIndexRef(grouping, firebase);
      return transaction
        .get(indexCollection)
        .then(postIndex => {
          let index = postIndex.data().index;
          let indToRemove = index.findIndex(
            post => post.postDataId === id
          );
          index.splice(indToRemove, 1);
          transaction.update(indexCollection, { index: index });
        })
        .then(() => {
          transaction.update(firebase.cmsPosts().doc(id), localCmsPost);
        })
        .then(() => {
          transaction.update(firebase.posts().doc(id), localCmsPost.post);
        })
        .then(() => {
          transaction.update(
            firebase.postData().doc(id),
            localCmsPost.postData
          );
        })
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}

/**
 * Conditional logic whether or not the post is published
 */
export function update(firebase, id, cmsPost, grouping) {
  let localCmsPost = JSON.parse(JSON.stringify(cmsPost));
  localCmsPost.lastModified = firebase.timestamp();

  return localCmsPost.post.isPublished
    ? updatePublishedPost(firebase, id, localCmsPost, grouping)
    : updateUnpublishedPost(firebase, id, localCmsPost);
}
/**
 * Collections: cms-post, post, postData
 * Batch update documents in above collections 
 */
function updateUnpublishedPost(firebase, id, cmsPost) {
  return new Promise((resolve, reject) => {
    let batch = firebase.batch();
    batch.update(firebase.cmsPosts().doc(id), cmsPost);
    batch.update(firebase.posts().doc(id), cmsPost.post);
    batch.update(firebase.postData().doc(id), cmsPost.postData);
    batch
      .commit()
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
}
/**
 * Collections: {postGroup}-index, cms-post, postData, post
 * If the post was published, ensure that the index entry matches the most up 
 * to date title/date combo in case it was changed
 */
function updatePublishedPost(firebase, id, cmsPost, grouping) {
  return new Promise((resolve, reject) => {
    firebase.runTransaction(transaction => {
      let indexCollection = getIndexRef(grouping, firebase);
      return transaction
        .get(indexCollection)
        .then(postIndex => {
          let index = postIndex.data().index;
          let postIndexEle = index.find(
            post => post.postDataId === id
          );
          postIndexEle.title = cmsPost.post.title;
          postIndexEle.date = cmsPost.post.date;
          transaction.update(indexCollection, { index: index });
        })
        .then(() => {
          transaction.update(firebase.cmsPosts().doc(id), cmsPost);
        })
        .then(() => {
          transaction.update(firebase.posts().doc(id), cmsPost.post);
        })
        .then(() => {
          transaction.update(
            firebase.postData().doc(id), cmsPost.postData
          );
        })
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}

/**
 * Collections: cms-post, post, post-data
 * Creates one document in each of the new collections with shared IDs
 */
export function insert(firebase, cmsPost) {
  return new Promise((resolve, reject) => {
    let newId;
    firebase
      .cmsPosts()
      .add(cmsPost)
      .then(docRef => {
        newId = docRef.id;
        let batchCreate = firebase.batch();
        batchCreate.set(firebase.posts().doc(newId), cmsPost.post);
        batchCreate.set(firebase.postData().doc(newId), cmsPost.postData);
        batchCreate.commit();
      })
      .then(() => {
        resolve({
          newId: newId,
          cmsPost: cmsPost
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}
