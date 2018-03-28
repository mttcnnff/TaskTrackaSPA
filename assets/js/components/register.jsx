import React from 'react';

function handleSubmit(event) {
	event.preventDefault();

	const formData = $('#register').serialize();
	console.log(formData);

	$.ajax({
      type: 'post',
      url: "/api/users", 
      data: formData,
      success: (resp) => {console.log(resp)},
      error: (resp) => {console.log(resp)},
    });
}
/*
<div className="form-group">
					    <label>Password</label>
					    <input type="password" className="form-control" placeholder="Password"></input>
					  </div>
					  */

export default function Register(params) {
  	return (
	  	<div className="container">
		  	<div className="row">
		  		<div className="col">
		  			<h2>Register</h2>
					<form id="register" onSubmit={(event) => handleSubmit(event)}>
					  <div className="form-group">
					    <label>Email address</label>
					    <input type="email" name="user[email]" className="form-control" placeholder="Enter email"></input>
					  </div>
					  <div className="form-group">
					    <label>Name</label>
					    <input type="text" name="user[name]" className="form-control" placeholder="Enter name"></input>
					  </div>
					  <button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			</div>
		</div>

  );
}