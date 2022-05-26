import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import "./App.css";
import Home from "./containers/Home";

function App() {
  return (
    <main>
      <section>
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </section>
    </main>
  );
}

export default App;
