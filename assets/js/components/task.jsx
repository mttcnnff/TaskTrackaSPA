
import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import api from '../api';
import store from '../store';
import { connect } from 'react-redux';

let Task = connect(({current_task}) => {return {current_task};})((props) => {
  let task = props.task;
  let status = task.completed == true ? "Completed: " + task.time + " min" : "In progress: " + task.time + " min";
  return (
  <Card className="mb-2">
  	<CardHeader className="d-flex justify-content-between pb-1 pt-1">
  		<p className="mb-0 lead">{ task.title }</p>
  		<p className={"mt-1 mb-1 " + (task.completed == true ? "text-success" : "text-info")}>{ status }</p>
  	</CardHeader>
    <CardBody className="p-3">
	    <div>
	        <p>{ task.description }</p>
	    </div>
	    <div className="d-flex justify-content-between">
	    	<div>
		    	<button className="btn btn-xs btn-primary mr-2" onClick={
		    		() => 
		    		props.dispatch({
		    			type: 'UPDATE_TASK_FORM',
		    		 	data: Object.assign({}, {user_email: task.user.email}, task)})
		    	} >Edit</button>
		    	<button className="btn btn-xs btn-danger" onClick={() => api.delete_task(task, props.token)} >Delete</button>
	    	</div>
	    	<div className="d-flex">
	    		<h6 className="mb-0">{ "Assigned to: " + task.user.name }</h6>
	    	</div>
	    </div>
    </CardBody>
  </Card>
  );
});

export default Task;