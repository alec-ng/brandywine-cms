import Slug from "../modules/slug";
import Util from '../modules/util';

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

  // unique key for url id
  get slug() {
    return Slug.createFromMetadata(this);
  }

  // returns a clone with typecasted propety values
  get typedcastedSelf() {
    let clone = PostMetadata.fromSelf(this);
    clone.lat = clone.lat && parseFloat(clone.lat);
    clone.lng = clone.lng && parseFloat(clone.lng);
    return clone;
  }

  // gets typecasted metadata properties of this instance
  get publishedSubset() {
    let obj = Object.assign({}, this.typedcastedSelf);
    // HOTFIX: safeguard against saving deprecated "key" field
    if (obj.key) {
      delete obj.key;
    }
    delete obj.isPublished;
    return obj;
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

  validateAllProps() {
    return Util.validateEmptyObject(this.publishedSubset, stringFields);
  }

  validateBaseProps() {
    const baseStrFields = stringFields.filter(
      field => !locationMdFields.includes(field)
    );
    let baseFields = Object.assign({}, this);
    locationMdFields.forEach(locationField => {
      delete baseFields[locationField];
    });

    return Util.validateEmptyObject(baseFields, baseStrFields);
  }

}

// ---------------- UTIL

const stringFields = [
  'title',
  'date',
  'grouping',
  'area',
  'region',
  'postDataId'
];

const locationMdFields = [
  'region',
  'area',
  'lat',
  'lng'
];

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
