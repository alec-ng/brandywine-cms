export function getPostDictionary(firebase) {
  return new Promise((resolve, reject) => {
    firebase
      .cmsPosts()
      .get()
      .then(snapshot => { 
        let mapping = {};
        snapshot.forEach(doc => {
          mapping[doc.id] = doc.data();
        });
        resolve(mapping); 
      })
      .catch(error => { reject(error) });
  });
}

/**
 * For one post, delete documents in all related collections
 */
export function remove(id, firebase) {
  let batch = firebase.batch();
  batch.delete(firebase.cmsPosts().doc(id));
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
 * Update cms-pots, posts, postData values.
 
 */
export function publish(firebase, id, cmsPost, postMetadata) {
  // TODO: export this logic out
  let localCmsPost = JSON.parse(JSON.stringify(cmsPost));
  localCmsPost.post.isPublished = true;
  localCmsPost.lastModified = firebase.timestamp();

  return new Promise((resolve, reject) => {
    firebase.runTransaction(transaction => {
      const publishedPostRef = firebase.publishedPosts();
      return transaction
        .get(publishedPostRef)
        // add the published post to the published post index list
        .then(root => {
          let index = root.data().index || [];
          index.push(postMetadata);
          transaction.update(publishedPostRef, { index: index });
        })
        // update the related cms-post document
        .then(() => {
          transaction.update(firebase.cmsPosts().doc(id), localCmsPost);
        })
        // update the post-data doucment
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
 
 * Remove entry from index collection and update cmspost, post, postData
 */
export function unpublish(firebase, id, cmsPost) {
  // TODO: extract logic out of this file
  let localCmsPost = JSON.parse(JSON.stringify(cmsPost));
  localCmsPost.post.isPublished = false;
  localCmsPost.lastModified = firebase.timestamp();

  return new Promise((resolve, reject) => {
    firebase.runTransaction(transaction => {
      const publishedPostRef = firebase.publishedPosts();
      return transaction
        .get(publishedPostRef)
        // remove the post from the published post index list
        .then(postIndex => {
          let index = postIndex.data().index;
          let indToRemove = index.findIndex(
            post => post.postDataId === id
          );
          index.splice(indToRemove, 1);
          transaction.update(publishedPostRef, { index: index });
        })
        // update the related cms-post document
        .then(() => {
          transaction.update(firebase.cmsPosts().doc(id), localCmsPost);
        })
        // update the post-data document
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
export function update(firebase, id, cmsPost, indexEntry) {
  // TODO: refactor logic out
  let localCmsPost = JSON.parse(JSON.stringify(cmsPost));
  localCmsPost.lastModified = firebase.timestamp();

  return localCmsPost.post.isPublished
    ? updatePublishedPost(firebase, id, localCmsPost, indexEntry)
    : updateUnpublishedPost(firebase, id, localCmsPost);
}
/**
 * Batch update documents in above collections 
 */
function updateUnpublishedPost(firebase, id, cmsPost) {
  return new Promise((resolve, reject) => {
    let batch = firebase.batch();
    batch.update(firebase.cmsPosts().doc(id), cmsPost);
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
 * If the post was published, ensure that the index entry matches the most up 
 * to date title/date combo in case it was changed
 */
function updatePublishedPost(firebase, id, cmsPost, indexEntry) {
  return new Promise((resolve, reject) => {
    firebase.runTransaction(transaction => {
      const publishedPostRef = firebase.publishedPosts();
      return transaction
        .get(publishedPostRef)
        // update relevant entry in published post index list
        .then(postIndex => {
          let index = postIndex.data().index;
          let entryToUpdate = index.findIndex(
            post => post.postDataId === id
          );
          index[entryToUpdate] = indexEntry;
          transaction.update(publishedPostRef, { index: index });
        })
        // update matching cms-post document
        .then(() => {
          transaction.update(firebase.cmsPosts().doc(id), cmsPost);
        })
        // update post-data document
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
