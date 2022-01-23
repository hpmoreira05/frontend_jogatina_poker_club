import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MatchCreate from './pages/matchCreate';
import Home from './pages/home';
import Matches from './pages/matches';
import Ranking from './pages/ranking';
import Users from './pages/users';
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
