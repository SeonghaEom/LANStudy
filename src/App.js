import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { connect } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import Question from './containers/WriteQuestion';
import QuestionAnswer from './containers/QuestionAnswer';
import Forum from './containers/Forum';
import Session from './containers/Session';

const mapStateToProps = state => ({
  ...state
})

function App() {

  
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/write" exact={true} component={Question} />
        <Route path="/question/:id" component={QuestionAnswer} />
        <Route path="/" exact={true} component={Forum} />
        <Route path="/join" exact={true} component={Session} />
      </div>
    </BrowserRouter>
  );
}

export default connect(mapStateToProps, null)(App);
