import { getSlugFromMetadata } from "../util/post-generation";
import Util from '../util/util';

/**
 * All post data not related to the actual content
 */
export default class PostMetadata {
  // Base metadata
  title = ''; // string;
  date = ''; // string;
  grouping = ''; // string; 
  
  // Location metadata
  area = ''; // ?string
  region = ''; // ?string;
  lat = ''; // ?number;
  lng = ''; // ?number;

  // Publish metadata
  isPublished = false; // boolean 
  postDataId = null; // ?string;
  get slug() {
    return getSlugFromMetadata(this);
  }

  /**
   * Static creation methods in place of constructor
   */
  static fromBaseMd(baseMetadata) {
    let instance = new PostMetadata();
    instance.grouping = baseMetadata.grouping;
    instance.date = baseMetadata.date;
    instance.title = baseMetadata.title;
    return instance;
  }

  static fromSelf(instance) {
    return PostMetadata.fromObject(Util.getObjFromClass(instance));
  }

  // assumes argument was created from a previous instance
  static fromObject(obj) {
    return Object.assign(new PostMetadata(), obj);
  }

  /**
   * Ensures all properties are non null for publishing 
   */
  publishValidation() {
    const propList = Object.keys(this);
    const invalidProps = Util.validateNonEmptyProps(this, propList);
    return invalidProps.length
      ? [`The following properties are missing: ${invalidProps.join(', ')}`]
      : [];
  }

  /**
   * returns the instance as an object with the minimal subset of information 
   * needed to represent a published post
   */
  getPublishedSubset() {
    let obj = Object.assign({}, this);
    // HOTFIX: safeguard against saving deprecated "key" field
    if (obj.key) {
      delete obj.key;
    }
    // TODO: remove key field?
    delete obj.isPublished;
    return obj;
  }

}

// ---------------- UTIL

export const baseMdFactory = () => ({
  title: '',
  date: '',
  grouping: ''
})

export const locationMdFactory = () => ({
  area: '',
  region: '',
  lat: '',
  lng: ''
});
