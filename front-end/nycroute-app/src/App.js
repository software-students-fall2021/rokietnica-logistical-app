import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

// this is the top-level component of the app, high-level components of our app
// are added the DOM by inserting them into the JSX here
function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/test1"><Test1 /></Route>
        <Route path="/test2"><Test2 /></Route>
      </Switch>
      <div className="App">
        <header className="App-header">
          <Link className="App-link" to="/test1">Router Test 1</Link>
          <Link className="App-link"to="/test2">Router Test 2</Link>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello World!</p>
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
    </Router>
  );
}

function Test1() {
  return <h2>Test1</h2>;
}

function Test2() {
  return <h2>Test2</h2>;
}

export default App;
