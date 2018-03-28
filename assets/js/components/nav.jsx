
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';

export default function Nav(props) {
  console.log(props);
  return props.user ?
  (
    <nav className="navbar navbar-dark bg-dark navbar-expand mb-5">
      <span className="navbar-brand">
        TaskTracker
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Feed</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/users" href="#" className="nav-link">Users</NavLink>
        </NavItem>
      </ul>
      <ul className="navbar-nav ml-auto">
        <NavItem>
          <span className="navbar-text">{"Hello, " + props.user.name + "!"}</span>
        </NavItem>
        <NavItem>
          <button onClick={() => props.logout()} className="btn btn-xs btn-outline-light ml-3">Log Out</button>
        </NavItem>
      </ul>
    </nav>
  )
  :
  (
    <nav className="navbar navbar-dark bg-dark navbar-expand mb-5">
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" href="#" className="nav-link navbar-brand">TaskTracker</NavLink>
        </NavItem>
      </ul>
    </nav>
  )

}