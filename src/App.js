import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import "./App.css";
import Home from "./containers/Home";
import Post from "./containers/Post";

function App() {
  return (
    <main>
      <section>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/:subject/:id">
              <Post />
            </Route>
          </Switch>
        </BrowserRouter>
      </section>
    </main>
  );
}

export default App;
