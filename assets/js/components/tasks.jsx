import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import TaskForm from './taskform';

class Tasks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: props.users
		};
	}

	componentWillReceiveProps(props) {
		this.setState({
			users: props.users,
		});
	}

	render() {
	  	return (
		  	<div className="container">
				<div className="row">	
			  		<div className="col-6 d-flex justify-content-center">
			  			<h2>Tasks</h2>
					</div>
					<div className="col-6 d-flex justify-content-center">
			  			<TaskForm users={this.state.users} />
					</div>
				</div>
			</div>

	  	);
	}
}

export default withRouter(Tasks);