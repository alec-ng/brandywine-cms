import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default class Firebase {
  constructor() {
    app.initializeApp(config);

    // Helpers 
    this.fieldValue = app.firestore.FieldValue;

    // Firebase APIs 
    this.auth = app.auth();
    this.db = app.firestore();

    // Social Signin Method Provider
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  // Auth API
  doSignInWithGoogle = () => {
    this.auth.signInWithPopup(this.googleProvider);
  };
  doSignOut = () => {
    this.auth.signOut();
  };

  // Firestore Collection API
  cmsPost = id => this.db.doc(`${COLLECTIONS.cmsPost}/${id}`);
  cmsPosts = () => this.db.collection(`${COLLECTIONS.cmsPost}`);
  singlePostData = id => this.db.doc(`${COLLECTIONS.postData}/${id}`);
  postData = () => this.db.collection(`${COLLECTIONS.postData}`);
  publishedPosts = () => this.db.doc(`${COLLECTIONS.publishedPosts}/root`);

  // Firebase API
  batch = () => this.db.batch();
  runTransaction = transactionCb => {
    return this.db.runTransaction(transactionCb);
  };
  timestamp = () => this.fieldValue.serverTimestamp();
}

// ------------------------------

const COLLECTIONS = {
  cmsPost: 'cms-post',
  postData: 'post-data',
  publishedPosts: 'tripreports-index'
}

const prodConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSENGER_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const sbxConfig = {
  apiKey: process.env.REACT_APP_SBX_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_SBX_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_SBX_DATABASE_URL,
  projectId: process.env.REACT_APP_SBX_PROJECT_ID,
  storageBucket: process.env.REACT_APP_SBX_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SBX_MESSENGER_SENDER_ID,
  appId: process.env.REACT_APP_SBX_APP_ID
};

const config =
  process.env.REACT_APP_ENV === "production" ? prodConfig : sbxConfig;

