import React from "react";
import { withFirebase } from "../components/hoc/firebase";
import { withAuthUser } from "../components/hoc/session";
import SignoutButton from "../components/stateless/global/signout-button";

/**
 * Page level component for admin section
 */
const BaseLogin = function(props) {
  if (props.authDataFetched && !props.authUser) {
    props.firebase.doSignInWithGoogle();
    return <h1>Please login to continue.</h1>;
  }
  if (!props.authDataFetched) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1>Signed in as {props.authUser.email}</h1>
      <SignoutButton />
    </div>
  );
};

const Login = withAuthUser(withFirebase(BaseLogin));
export default Login;
