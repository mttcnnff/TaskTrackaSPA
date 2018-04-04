import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

// function handleSubmit(event) {
// 	event.preventDefault();

// 	const formData = $('#register').serialize();
// 	console.log(formData);


// 	$.ajax({
//       type: 'post',
//       url: "/api/users", 
//       data: formData,
//       success: (resp) => {Alerts.flashAlert("New user created!"); $('#register')[0].reset()},
//       error: (resp) => {Alerts.flashDanger("Failed - " + resp.responseText)},
//     });
// }

// export default function RegisterForm(params) {
//   	return (
// 	  	<div className="container">
// 		  	<div className="row">
// 		  		<div className="col">
// 		  			<h2>Register</h2>
// 		  			<div id="errors" className="d-none">
// 		  			</div>
// 					<form id="register" onSubmit={(event) => handleSubmit(event)}>
// 					  <div className="form-group">
// 					    <label>Email address</label>
// 					    <input type="email" name="user[email]" className="form-control" placeholder="Enter email"></input>
// 					  </div>
// 					  <div className="form-group">
// 					    <label>Name</label>
// 					    <input type="text" name="user[name]" className="form-control" placeholder="Enter name"></input>
// 					  </div>
// 					  <div className="form-group">
// 					  	<label>Password</label>
//    						<input type="password" name="user[password]" className="form-control" placeholder="Password"/>
// 					  </div>
// 					  <div className="form-group">
// 					  	<label>Confirm Password</label>
//    						<input type="password" name="user[password_confirmation]" className="form-control" placeholder="Password"/>
// 					  </div>
// 					  <button type="submit" className="btn btn-primary">Submit</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>

//   );
// }

let RegisterForm = connect(({register}) => {return {register};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_REGISTER_FORM',
      data: data,
    });
  }

  function register(ev) {
  	let data = {
  		user: props.register,
  	}
    api.register_user(data);
    console.log(props.register);
  }

  return (
	<div className="container">
  		<div className="row">
  			<div className="col">
  				<h2>Register</h2>
			    <Form>
			      <FormGroup>
			        <label>Email</label>
			        <Input className="form-control" type="email" name="email" placeholder="example@example.com"
			               value={props.register.email} onChange={update} />
			      </FormGroup>
			      <FormGroup>
			        <label>Name</label>
			        <Input type="text" name="name" placeholder="John Appleseed"
			               value={props.register.name} onChange={update} />
			      </FormGroup>
			      <FormGroup>
			        <label>Password</label>
			        <Input type="password" name="password" placeholder="password"
			               value={props.register.password} onChange={update} />
			      </FormGroup>
			      <FormGroup>
			        <label>Confirm Password</label>
			        <Input type="password" name="password_confirmation" placeholder="confirm password"
			               value={props.register.password_confirmation} onChange={update} />
			      </FormGroup>
			      <Button color="primary" className="mr-2" onClick={register}>Log In</Button>
			    </Form>
			</div>
		</div>
	</div>
  );
});

export default RegisterForm;