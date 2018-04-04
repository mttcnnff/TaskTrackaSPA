import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';


import Nav from './nav';
import Feed from './feed';
import Users from './users';
import LoginForm from './loginform';
import RegisterForm from './registerform';
import Tasks from './tasks';
import { history } from 'react-router-dom';


export default function tasktracka_init(store) {
  let root = document.getElementById('root');
  ReactDOM.render(
    <Provider store={store}>
      <TaskTracka />
    </Provider>, root);
}

let TaskTracka = connect((state) => state)((props) => {
  return (
      <Router>
        <div>
          <Nav flash={props.flash} />
          <Route path="/" exact={true} render={
            () => props.user ? 
            <Tasks /> 
            :
            <LoginForm />
          } />
          <Route path="/register" exact={true} render={() =>
            <RegisterForm />
          } />
        </div>
      </Router>
    );
});