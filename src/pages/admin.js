import React from "react";
import { Provider } from 'react-redux';
import { store } from '../state';
import { withAuthorization } from "../components/hoc/session";
import App from '../components/stateful/brandywine-cms';

const Admin = function() {
  return (
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>
  );
}

// Condition is also server enforced that limits CRUD to the admin email.
const condition = authUser =>
  authUser && authUser.email === process.env.REACT_APP_ADMIN_EMAIL;
export default withAuthorization(condition)(Admin);

