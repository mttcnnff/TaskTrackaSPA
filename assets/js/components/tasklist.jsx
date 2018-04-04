import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Task from './task';
import { connect } from 'react-redux';

let TaskList = connect(({tasks, token}) => {return {tasks, token};})((props) => {
	let tasks = _.map(props.tasks, 
		(task) => 
			<Task
				token={props.token} 
				key={"task" + task.id} 
				task={task} />
			);
	tasks.reverse();

	return (
	  	<div className="container">
		  	<div className="row">
		  		<div className="col">
		  			<div className="d-flex justify-content-center">
		  				<h2>Tasks</h2>
		  			</div>
		  			<div className="task-list">
		  				{ tasks }
		  			</div>
				</div>
			</div>
		</div>
  	);
});

export default TaskList;