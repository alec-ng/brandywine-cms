import PostMetadata from './post-metadata';
import Util from '../modules/util';

/**
 * Top level collection storing all post related data
 */
export default class CMSPost {
  // string, YYYY-MM-DD
  createdDate = Util.getCurrDateStr(); 
  // object, firebase or moment timestamp
  lastModified;  
  // PostMetadata class
  post; 
  // brandywine editor data
  postData = {}; 

  /**
   * static creation methods instead of constructor
   */
  static fromBaseMd(baseMetadata) {
    let instance = new this();
    instance.post = PostMetadata.fromBaseMd(baseMetadata);
    return instance;
  }

  static fromSelf(instance) {
    // deep clone value properties
    const objClone = Object.assign({}, instance, {
      post: PostMetadata.fromSelf(instance.post),
      postData: JSON.parse(JSON.stringify(instance.postData))
    });
    return CMSPost.fromObject(objClone);
  }

  static fromObject(obj) {
    const metadata = {
      post: PostMetadata.fromObject(obj.post)
    };
    return Object.assign(new this(), obj, metadata);
  }

  /**
   * Additional validation to be called on top of form validation
   * All optional fields become required + any custom validation logic
   */
  publishValidation() {
    let errs = [];

    // Post Metadata specific validation
    errs = errs.concat(this.post.validateAllProps());
    
    // post must contain at least a title and one block
    if (!this.postData) {
      errs.push(`You cannot publish an empty post.`);
    }

    const { header, blocks } = Object.keys(this.postData).length
      ? this.postData
      : { header: {}, blocks: [] };
    
    if (!header.title || !header.title.trim()) {
      errs.push('You must supply a title to the post');
    }
    if (!blocks.length) {
      errs.push('Your post content cannot be empty');
    }

    return errs;
  }
}
