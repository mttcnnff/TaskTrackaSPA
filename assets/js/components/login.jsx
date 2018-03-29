import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function Login(params) {
  	return (
	  	<div className="container">
		  	<div className="row">
		  		<div className="col">
		  			<h2>Login</h2>
					<form id="login" onSubmit={(event) => params.login(event)}>
					  <div className="form-group">
					    <label>Email address</label>
					    <input type="email" name="email" className="form-control" placeholder="Enter email"></input>
					  </div>
					  <div className="form-group">
					  	<label>Password</label>
   						<input type="password" name="password" className="form-control" placeholder="Password"/>
					  </div>
					  <div className="form-group">
					  	<input type="submit" value="Submit" className="btn btn-primary mr-2"/>
					  	<Link to={"/register"}>Register</Link>
					  </div>
					</form>
				</div>
			</div>
		</div>

  );
}

export default withRouter(Login);