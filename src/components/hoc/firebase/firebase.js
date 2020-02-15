import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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

const COLLECTION_CMS_POST = "cms-post";
const COLLECTION_POST = "post";
const COLLECTION_POST_DATA = "post-data";
const COLLECTION_PHOTOGRAPHY_INDEX = "photography-index";
const COLLECTION_TRIPREPORT_INDEX = "tripreports-index";

class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helpers */
    this.fieldValue = app.firestore.FieldValue;

    /* Firebase APIs */
    this.auth = app.auth();
    this.db = app.firestore();

    /* Social Signin Method Provider */
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  /* Auth API */
  doSignInWithGoogle = () => {
    this.auth.signInWithPopup(this.googleProvider);
  };
  doSignOut = () => {
    this.auth.signOut();
  };

  /* Firestore API */
  post = id => this.db.doc(`${COLLECTION_POST}/${id}`);
  posts = () => this.db.collection(`${COLLECTION_POST}`);
  cmsPost = id => this.db.doc(`${COLLECTION_CMS_POST}/${id}`);
  cmsPosts = () => this.db.collection(`${COLLECTION_CMS_POST}`);
  singlePostData = id => this.db.doc(`${COLLECTION_POST_DATA}/${id}`);
  postData = () => this.db.collection(`${COLLECTION_POST_DATA}`);
  photographyIndex = () => this.db.doc(`${COLLECTION_PHOTOGRAPHY_INDEX}/root`);
  tripreportIndex = () => this.db.doc(`${COLLECTION_TRIPREPORT_INDEX}/root`);

  batch = () => this.db.batch();
  runTransaction = transactionCb => {
    return this.db.runTransaction(transactionCb);
  };
  timestamp = () => this.fieldValue.serverTimestamp();
}

export default Firebase;
