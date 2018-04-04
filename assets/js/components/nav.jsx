import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';
import store from '../store';
import { connect } from 'react-redux';
import api from '../api';

let Info = connect(({flash}) => {return {flash};})((props) => {
  return <div className="alert alert-info d-flex justify-content-between">
    <p className="mb-0" role="alert">{ props.flash.info }</p>
    <button 
      className="btn btn-xs btn-outline-info" 
      onClick={() => store.dispatch({type: 'CLEAR_INFO_BAR',data: {}})}>Close</button>
  </div>;
});

let Danger = connect(({flash}) => {return {flash};})((props) => {
  return <div className="alert alert-danger d-flex justify-content-between">
    <p className="mb-0" role="alert">{ props.flash.danger }</p>
    <button className="btn btn-xs btn-outline-danger"
    onClick={() => store.dispatch({type: 'CLEAR_DANGER_BAR',data: {}})}>Close</button>
  </div>
});

let RightNav = connect(({user}) => {return {user};})((props) => {
  return (
    props.user ?

    <ul className="navbar-nav ml-auto">
         <NavItem>
           <span className="navbar-text">{"Hello, " + props.user.name + "!"}</span>
         </NavItem>
         <NavItem>
          <button onClick={() => api.submit_logout()} className="btn btn-xs btn-outline-light ml-3">Log Out</button>
       </NavItem>
    </ul>
    :
    <ul className="navbar-nav ml-auto">
         <NavItem>
           <NavLink to="/" className="nav-link">Log In</NavLink>
         </NavItem>
    </ul>
  );
});

function Nav(props) {
  let info;
  if (props.flash.info) {
    info = <Info />
  }

  let danger;
  if (props.flash.danger) {
    danger = <Danger />
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand mb-3">
        <span className="navbar-brand">
          TaskTracker
        </span>
        <ul className="navbar-nav mr-auto">
        </ul>
        <RightNav />
      </nav>
      <div className="container">
        { info }
        { danger }
      </div>
    </div>
  );
}

export default Nav;