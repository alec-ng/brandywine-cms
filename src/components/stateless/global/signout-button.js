import React from "react";
import { withFirebase } from "./../../hoc/firebase";

function BaseSignoutButton(props) {
  function handleClick() {
    props.firebase.doSignOut();
  }

  return (
    <button type="button" onClick={handleClick}>
      Logout
    </button>
  );
}

const SignoutButton = withFirebase(BaseSignoutButton);

export default SignoutButton;
