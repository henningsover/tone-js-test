import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage/';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import TrackerPage from './pages/TrackerPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import { Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './globalStyled';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <>
      <GlobalStyle />
      <Switch>
        <PrivateRoute exact path="/" component={TrackerPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
      </Switch>
    </>
  );
}

export default App;
