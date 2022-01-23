import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MatchCreate from './pages/MatchCreate';
import Home from './pages/Home';
import Matches from './pages/Matches';
import Ranking from './pages/Ranking';
import Users from './pages/Users';
import './styles/index.css'

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/" component={Home} />
        <Route exact path="/createMatch" component={MatchCreate} />
        <Route exact path="/matches" component={Matches} />
        <Route exact path="/ranking" component={Ranking} />
        <Route exact path="/createUser" component={Users} />
      </Switch>
    </div>
  );
}

export default App;
