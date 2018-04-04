import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
    console.log(props.login);
  }

  return (
	<div className="container">
  		<div className="row">
  			<div className="col">
  				<h2>Login</h2>
			    <Form>
			      <FormGroup>
			        <label>Email</label>
			        <Input type="email" name="email" placeholder="example@example.com"
			               value={props.login.email} onChange={update} />
			      </FormGroup>
			      <FormGroup>
			        <label>Password</label>
			        <Input type="password" name="password" placeholder="password"
			               value={props.login.password} onChange={update} />
			      </FormGroup>
			      <Button color="primary" className="mr-2" onClick={create_token}>Log In</Button>
			      <Link to={"/register"}>Register</Link>
			    </Form>
			</div>
		</div>
	</div>
  );
});

export default LoginForm;