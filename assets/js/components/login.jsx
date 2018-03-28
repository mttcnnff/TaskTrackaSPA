import React from 'react';
import { Link } from 'react-router-dom';

function handleSubmit(event) {
	event.preventDefault();

	
}

export default function Login(params) {
  	return (
	  	<div className="container">
		  	<div className="row">
		  		<div className="col">
		  			<h2>Login</h2>
					<form onSubmit={(event) => handleSubmit(event)}>
					  <div className="form-group">
					    <label>Email address</label>
					    <input type="email" className="form-control" placeholder="Enter email"></input>
					  </div>
					  <div className="form-group">
					  	<button type="submit" className="btn btn-primary mr-2">Submit</button>
					  	<Link to={"/register"}>Register</Link>
					  </div>
					</form>
				</div>
			</div>
		</div>

  );
}