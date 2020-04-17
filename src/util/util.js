const Util = {
  /**
   * Returns current day as YYYY-MM-DD ISO string
   */
  getCurrDateStr: function() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  },

  /**
   * Recursively converts a class instance into an object, preserving 
   * only value properties and not its methods
   */
  getObjFromClass: function(instance) {
    return Object.keys(instance).reduce((obj, prop) => {
      const isClassInstance = 
        instance[prop] &&
        typeof instance[prop] === 'object' &&
        instance[prop].constructor.name !== 'Object';
      
      if (isClassInstance) {
        obj[prop] = this.getObjFromClass(instance[prop]);
      } else {
        obj[prop] = instance[prop];
      }
      return obj;
    }, {});
  },

  /**
   * Returns a trimmed copy of the object
   * Default -- trims all properties, can be overriden
   */
  trimObj: function(
    obj, 
    propList = Object.keys(obj)
  ) {
    return Object.keys(obj)
      .reduce((copy, prop) => (
         {...copy, ...{
          [prop]: obj[prop].trim()
        }}
      ), {});
  },

  /**
   * Ensure all of object's values are "non empty"
   */
  validateEmptyObject: function (
    obj, 
    strPropList, // list of keys in obj that should be validated as strings
    emptyValidator, // optional, function(val:any): boolean
    strValidator  // optional, function(val:str): boolean
  ) {
    const copyReducer = (newObj, prop) => { 
      const copy = { [prop] : obj[prop] };
      return {...newObj, ...copy};
    };

    const strSubset = strPropList.reduce(copyReducer, {});
    const checkFalsySubset = Object.keys(obj)
      .filter(prop => !strPropList.includes(prop))
      .reduce(copyReducer, {});
    
    return [
      ...validateProps('string', strSubset, strValidator),
      ...validateProps('falsy', checkFalsySubset, emptyValidator)
    ];
  },
}

export default Util;

// PRIVATE
/////////////////////////////////////////////

/**
 * Helper to validate an object based on the type and validator specified
 */
function validateProps(type, obj, validator) {
  // set default valiators based on type and override
  if (type === 'string' && !validator) {
    validator = defaultStrValidator;
  } else if (!validator) {
    validator = defaultValidator;
  }

  // filter and return
  const invalidPropList = Object.keys(obj).filter(
    prop => !validator(obj[prop])
  );
  return invalidPropList.length
    ? [
      `The following fields are empty or invalid: ${invalidPropList.join(', ')}`
    ] : [];
  }

const trailingLeadingSpaceRegEx = /^\s|\s$/;

// trimmed string with at least 3 chars and without trailing/leading whitespace
const defaultStrValidator = str => 
  typeof str === 'string' && 
  str.trim().length >= 3 &&
  !trailingLeadingSpaceRegEx.test(str);

// non falsy value, expect if the value is a boolean
const defaultValidator =  val => 
  typeof val === 'boolean'
    ? true
    : !val ? false : true