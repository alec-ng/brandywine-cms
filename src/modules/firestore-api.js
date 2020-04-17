import Util from './util';

/**
 * Async methods to perform CRUD operations on the firestore database
 * All methods return promises
 */
const FirestoreAPI = {
  /**
   * fetches all cms-post documents and returns a mapping of
   * return  firebaseId:string -> cmsPost:CMSPost
   */
  getPostDictionary: function(firebase) {
    return new Promise((resolve, reject) => {
      firebase
        .cmsPosts()
        .get()
        .then(snapshot => { 
          const dict = snapshot.docs.reduce((mapping, doc) => {
            mapping[doc.id] = doc.data()
            return mapping;
          }, {});
          resolve(dict);
        })
        .catch(error => { reject(error) });
    });
  },

  /**
   * removes a document from cms-posts and postData
   * does not account for published metadata
   */
  remove: function(id, firebase) {
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
  },

  /**
   * handles publishing (doPublish=true) and unpublishing (doPublish=false) of posts
   * updates cms-post and post-data documents, updates publishedPosts index
   */
  togglePublish: function(firebase, cmsPost, doPublish) {
    const publishMd = cmsPost.post.publishedSubset;
    let clone = Util.getObjFromClass(cmsPost);
    clone.post.isPublished = doPublish;
    clone.lastModified = firebase.timestamp();
    
    return updatePublishedPost(firebase, clone, (index) => {
      if (doPublish) {
        index.push(publishMd);
      } else {
        const indToRemove = index.findIndex(
          post => post.postDataId === cmsPost.post.postDataId
        );
        index.splice(indToRemove, 1);
      }
      return index;
    });
  },

  /**
   * Conditional logic whether or not the post is published
   */
  update: function(firebase, cmsPost) {
    const publishMd = cmsPost.post.publishedSubset;
    let clone = Util.getObjFromClass(cmsPost);
    clone.lastModified = firebase.timestamp();

    if (clone.post.isPublished) {
      return updatePublishedPost(firebase, clone, (index) => {
        const indtoUpdate = index.findIndex(
          post => post.postDataId === cmsPost.post.postDataId
        );
        index[indtoUpdate] = publishMd;
        return index;
      });
    } else {
      return updateUnpublishedPost(firebase, clone)
    }
  },

  /**
   * Creates one document in each of the new collections with shared IDs
   */
  insert: function(firebase, cmsPost) {
    let writeVal = Util.getObjFromClass(cmsPost);

    return new Promise((resolve, reject) => {
      let newId;
      firebase
        .cmsPosts()
        .add(writeVal)
        .then(docRef => {
          newId = docRef.id;
          let batch = firebase.batch();
          batch.set(firebase.postData().doc(newId), writeVal.postData);
          writeVal.post.postDataId = newId; // write new id back to document
          batch.set(docRef, writeVal)
          batch.commit();
        })
        .then(() => {
          resolve({
            cmsPost: cmsPost,
            newId: newId
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default FirestoreAPI;


// PRIVATE
////////////////////////////////

/**
 * Helper to update all documents related to updating a published post
 */
function updatePublishedPost(firebase, cmsPost, updateIndexCb) {
  const publishedPostRef = firebase.publishedPosts();
  const id = cmsPost.post.postDataId;

  return new Promise((resolve, reject) => {
    firebase.runTransaction(transaction => transaction
      .get(publishedPostRef)
  
      // add the published post to the published post index list
      .then(root => { 
        const index = root.data().index;
        const newIndex = updateIndexCb(index);
        transaction.update(publishedPostRef, { index: newIndex });
      })
  
      // update the related cms-post document
      .then(() => {
        transaction.update(
          firebase.cmsPosts().doc(id), cmsPost
        );
      })
      // update the post-data doucment
      .then(() => {
        transaction.update(
          firebase.postData().doc(id),
          cmsPost.postData
        );
      })
      .then(() => { resolve(); })
      .catch(error => { reject(error); })
    );
  });
}

/**
 * Helper to  batch update all documents related to updating an unpublished post
 */
function updateUnpublishedPost(firebase, cmsPost) {
  const id = cmsPost.post.postDataId;

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