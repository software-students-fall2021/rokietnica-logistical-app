import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

// import your component functions for use in route links
import { Test1 } from "./Test1.js";
import { Test2 } from "./Test2.js";
import TestBootStrap from "./TestBootStrap.js";

function App() {
  // add links to your pages for now
  return (
    <Switch>
      <Route exact path="/" component={CreateReactHome}></Route>
      <Route exact path="/test1" component={Test1}></Route>
      <Route exact path="/test2" component={Test2}></Route>
      <Route exact path="/testBootstrap" component={TestBootStrap}></Route>
    </Switch>
  );
}

function CreateReactHome() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello World!</p>
        <Link className="App-link" to="/test1">
          Test 1
        </Link>
        <Link className="App-link" to="/test2">
          Test 2
        </Link>
        <Link className="App-link" to="/testBootstrap">
          BootStrap Test
        </Link>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
