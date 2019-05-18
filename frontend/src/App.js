import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Upload from './components/Upload'
import Results from './components/Results'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={ Home }/>
          <Route exact path="/upload" component={ Upload }/>
          <Route exact path="/" component={ Results }/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
