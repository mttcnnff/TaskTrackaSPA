import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import TaskForm from './taskform';
import TaskList from './tasklist';

class Tasks extends React.Component {
	render() {
	  	return (
		  	<div className="container">
				<div className="row">	
			  		<div className="col-6 d-flex justify-content-center">
			  			<TaskList />
					</div>
					<div className="col-6 d-flex justify-content-center">
			  			<TaskForm />
					</div>
				</div>
			</div>

	  	);
	}
}

export default withRouter(Tasks);