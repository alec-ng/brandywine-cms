import React from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../firebase";
import { withAuthUser } from "./context";

/**
 * higher order component to provide authorization of components using the authUser
 */
const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          this.props.history.push("/login");
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return condition(this.props.authUser) ? (
        <Component {...this.props} />
      ) : null;
    }
  }
  return withFirebase(withAuthUser(withRouter(WithAuthorization)));
};
export default withAuthorization;
