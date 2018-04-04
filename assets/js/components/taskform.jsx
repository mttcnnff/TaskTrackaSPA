import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

let TaskForm = connect(({taskform, users, token}) => {return {taskform, users, token};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_TASK_FORM',
      data: data,
    });
  }

  function updateCheckBox(ev) {
  	let tgt = $(ev.target);
    let data = {};
    if (tgt.val() === 'false') {
    	data[tgt.attr('name')] = true;
    } else {
    	data[tgt.attr('name')] = false;
    }
    props.dispatch({
      type: 'UPDATE_TASK_FORM',
      data: data,
    });
  }

  function create_task(ev) {
    api.new_task(props.taskform, props.token);
  }

  function update_task(ev) {
    api.update_task(props.taskform, props.token);
  }

  function clear() {
  	props.dispatch({
      type: 'CLEAR_TASK_FORM',
      data: null,
    });
  }

  let users = _.map(props.users, (user, index) => <option key={'user' + index + 1} value={user.email} >{user.name + " - " + user.email}</option>);
  users.unshift(<option key={'user0'} value={""} >{"Select a user ..."}</option>);

  return ( 	
	<div className="container">
  		<div className="row">
  			<div className="col">
  				<div className="d-flex justify-content-center">
  					 {props.taskform.id ? <h2>Editing Task</h2> : <h2>New Task</h2>}
  				</div>
			    <Form>
			      <FormGroup>
			        <label>Title</label>
			        <Input className="form-control" type="text" name="title" placeholder="Title"
			               value={props.taskform.title} onChange={update} />
			      </FormGroup>
			      <FormGroup>
			        <label>Description</label>
			        <textarea 
						  		id="description"
						  		name="description" 
						  		className="form-control" 
						  		placeholder="Enter description ... " 
						  		rows="3"
						  		value={props.taskform.description} 
						  		onChange={update} />
			      </FormGroup>
			      <FormGroup>
			      	<label>Assigned To</label>
				  	<select 
				  		id="user"
				  		className="form-control" 
				  		name="user_email" 
				  		value={props.taskform.user_email} 
				  		onChange={update} >
				  	{ users }
				    </select>
			      </FormGroup>
			      <FormGroup className="form-inline">
			      	<label className="mr-3">Time Spent</label>
					<Input 
						id="time"
						type="number" 
						name="time" 
						className="form-control" 
						step="15" 
						min="0" 
						value={props.taskform.time}
						onChange={update} />
		  			<input 
		  				id="completed"
		  				className="form-check-input ml-4" 
		  				type="checkbox" 
		  				name="completed"
		  				value={props.taskform.completed}
		  				onChange={updateCheckBox} />
		  			<label className="form-check-label">Completed</label>
			      </FormGroup>
			      <FormGroup>
				      {props.taskform.id ? 
				      	<div>
					      	<Button color="primary" className="mr-2" onClick={update_task}>Update Task</Button>
					      	<Button color="danger" onClick={clear}>Cancel</Button>
				      	</div>
				      	:
				      	<Button color="primary" className="mr-2" onClick={create_task}>Create Task</Button>

				      }
			      </FormGroup>			      
			    </Form>
			</div>
		</div>
	</div>
  );
});

export default TaskForm;