import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ManageQuiz from "./components/ManageQuiz/ManageQuiz"
import CreateQuiz from "./components/CreateQuiz/CreateQuiz"
import Navigation from "./components/Navigation/Navigation"
import PickQuiz from "./components/TakeQuiz/PickQuiz"
import TakeQuiz from "./components/TakeQuiz/TakeQuiz"
import EditQuiz from "./components/EditQuiz/EditQuiz"

function App() {
  return (
    <div className="App">
      <Navigation />
      <Router>
        <Switch>
          <Route exact path="/" component={ManageQuiz}></Route>
          <Route path="/manage" component={ManageQuiz}></Route>
          <Route path="/create" component={CreateQuiz}></Route>
          <Route path="/pickquiz" component={PickQuiz}></Route>
          <Route path="/takequiz/:id" component={TakeQuiz}></Route>
          <Route path="/editquiz/:id" component={EditQuiz}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
