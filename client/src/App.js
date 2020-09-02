import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ManageQuiz from "./components/ManageQuiz/ManageQuiz"
import CreateQuiz from "./components/CreateQuiz/CreateQuiz"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={ManageQuiz}></Route>
          <Route path="/manage" component={ManageQuiz}></Route>
          <Route path="/create" component={CreateQuiz}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
