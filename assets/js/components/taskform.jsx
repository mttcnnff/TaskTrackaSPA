import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function handleSubmit(event) {
	event.preventDefault()

	const formData = $('#task').serialize();
	console.log(formData);
}

export default function TaskForm(params) {
	console.log(params);
	let users = _.map(params.users, (user, index) => <option key={index}>{user.name}</option>);
	console.log(users);
  	return (
	  	<div className="container">
		  	<div className="row">
		  		<div className="col">
		  			<div className="d-flex justify-content-center">
		  				<h2>Login</h2>
		  			</div>
					<form id="task" onSubmit={(event) => handleSubmit(event)}>
					  <div className="form-group">
					    <label>Title</label>
					    <input type="text" name="task[title]" className="form-control" placeholder="Enter title"></input>
					  </div>
					  <div className="form-group">
					  	<label>Description</label>
					  	<textarea name="task[description]" className="form-control" placeholder="Enter description" rows="3"></textarea>
					  </div>
					  <div className="form-group">
					  	<label>Assigned To</label>
					  	<select className="form-control" value={undefined}>
					      { users }
					    </select>
					  </div>
					  <div className="form-group form-inline">
					  		<label className="mr-3">Time Spent</label>
   							<input type="number" name="task[time]" className="form-control" step="15" min="0" />
					  </div>
					  <div className="form-group">
					  		<div className="d-flex form-check align-content-center">
					  			<input className="form-check-input" type="checkbox" value="" name="task[completed]" />
					  			<label className="form-check-label">Completed</label>
					  		</div>
					  	</div>
					  <div className="form-group">
					  	<input type="submit" value="Submit" className="btn btn-primary mr-2"/>
					  </div>
					</form>
				</div>
			</div>
		</div>
  );
}