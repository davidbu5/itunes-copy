import React from 'react';
import './App.css';
import SearchConsole from './components/searchConsole/searchConsole';
import { Switch, Route } from 'react-router';
import Result from './components/result/result';
import Signin from './components/signin/signin';
import Login from './components/login/login';
import Header from './components/header/header';
import TopTenSearches from './components/top10/top10';
import Logout from './components/logout/logout';

function App() {
  return (
    <span>
      <div>
        <Header></Header>
      </div>
      <main>
        <Switch>
          <Route exact path="/" component={SearchConsole} />
          <Route path="/signin" component={Signin} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/top10" component={TopTenSearches} />
          <Route path="/search/:queryText" component={SearchConsole} />
          <Route path="/result/:resultId" component={Result} />
        </Switch>
      </main>
    </span>
  );
}

export default App;


