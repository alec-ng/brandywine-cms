import React from "react";

const FirebaseContext = React.createContext(null);

/**
 * Higher order component for providing firebase
 */
export const withFirebase = function(Component) {
  return function(props) {
    return (
      <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
      </FirebaseContext.Consumer>
    );
  };
};

export default FirebaseContext;
