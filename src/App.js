import React from "react";
import { withAuthentication } from "./components/session";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Admin from "./pages/admin";
import Login from "./pages/login";
import NotFound from "./pages/not-found";

function BaseApp(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Admin />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

const App = withAuthentication(BaseApp);
export default App;
