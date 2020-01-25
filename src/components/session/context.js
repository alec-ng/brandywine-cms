import React from "react";

const AuthUserContext = React.createContext(null); // default starting value

/**
 * Higher order component for consuming auth user
 */
export const withAuthUser = function(Component) {
  return function(props) {
    return (
      <AuthUserContext.Consumer>
        {context => (
          <Component
            {...props}
            authUser={context.authUser}
            authDataFetched={context.authDataFetched}
          />
        )}
      </AuthUserContext.Consumer>
    );
  };
};

export default AuthUserContext;
