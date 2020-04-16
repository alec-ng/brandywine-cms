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
   * Checks the given object's properties to see if they are falsy or empty strings.
   * Names of invalid props are returned in a list
   */
  validateNonEmptyProps: function(obj, propList = Object.keys(obj)) {
    let invalidPropList = [];
    propList.forEach(prop => {
      if (obj[prop] === null || obj[prop] === undefined) {
        invalidPropList.push(prop);
      }
      if (typeof obj[prop] === 'string' && !obj[prop].trim()) {
        invalidPropList.push(prop);
      }
    });
    return invalidPropList;
  }

}

export default Util;