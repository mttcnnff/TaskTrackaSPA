import React from 'react';
import * as Alerts from './alert';

function handleSubmit(event) {
	event.preventDefault();

	const formData = $('#register').serialize();
	console.log(formData);


	$.ajax({
      type: 'post',
      url: "/api/users", 
      data: formData,
      success: (resp) => {Alerts.flashAlert("New user created!"); $('#register')[0].reset()},
      error: (resp) => {Alerts.flashDanger("Failed - " + resp.responseText)},
    });
}

export default function Register(params) {
  	return (
	  	<div className="container">
		  	<div className="row">
		  		<div className="col">
		  			<h2>Register</h2>
		  			<div id="errors" className="d-none">
		  			</div>
					<form id="register" onSubmit={(event) => handleSubmit(event)}>
					  <div className="form-group">
					    <label>Email address</label>
					    <input type="email" name="user[email]" className="form-control" placeholder="Enter email"></input>
					  </div>
					  <div className="form-group">
					    <label>Name</label>
					    <input type="text" name="user[name]" className="form-control" placeholder="Enter name"></input>
					  </div>
					  <div className="form-group">
					  	<label>Password</label>
   						<input type="password" name="user[password]" className="form-control" placeholder="Password"/>
					  </div>
					  <div className="form-group">
					  	<label>Confirm Password</label>
   						<input type="password" name="user[password_confirmation]" className="form-control" placeholder="Password"/>
					  </div>
					  <button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		</div>

  );
}