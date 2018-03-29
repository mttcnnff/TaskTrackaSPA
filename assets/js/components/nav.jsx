import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';

export default function Nav(props) {
  let rightnav = props.user ?
  (
  <ul className="navbar-nav ml-auto">
    <NavItem>
      <span className="navbar-text">{"Hello, " + props.user.name + "!"}</span>
    </NavItem>
    <NavItem>
      <button onClick={() => props.logout()} className="btn btn-xs btn-outline-light ml-3">Log Out</button>
    </NavItem>
  </ul>
  )
  :
  (
  <ul className="navbar-nav ml-auto">
    <NavItem>
      <NavLink to="/" className="nav-link">Log In</NavLink>
    </NavItem>
  </ul>
  );

  let navbar =
  (
    <nav className="navbar navbar-dark bg-dark navbar-expand mb-3">
      <span className="navbar-brand">
        TaskTracker
      </span>
      <ul className="navbar-nav mr-auto">
      </ul>
      { rightnav }
    </nav>
  );

  return (
    <div>
      { navbar }
      <div className="container">
        <div id="alert-block" className="d-none">
          <p className="alert alert-info" role="alert"></p>
        </div>
        <div id="danger-block" className="d-none">
          <p className="alert alert-danger" role="alert"></p>
        </div>
      </div>
    </div>


  );

}