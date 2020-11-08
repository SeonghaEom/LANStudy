import React from 'react';

import logo from './logo.svg';
import './App.scss';
import { connect } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Question from './containers/WriteQuestion';
import Sidebar from './containers/Sidebar';
import QuestionAnswer from './containers/QuestionAnswer';
import Forum from './containers/Forum';
import Session from './containers/Session';
import Login from './containers/Login';

import Main from './components/Main/Main';
import Room from './components/Room/Room'
import styled from 'styled-components';


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
        <Route path="/login" exact={true} component={Login} />
      </div>
        <AppContainer>
            <Switch>
                <Route exact path="/join" component={Main} />
                <Route exact path="/room/:roomId" component={Room} />
            </Switch>
        </AppContainer>
    </BrowserRouter>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: calc(8px + 2vmin);
  color: white;
  background-color: #454552;
  text-align: center;
`;

export default connect(mapStateToProps, null)(App);
