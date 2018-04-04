import store from "./store";

class TheServer {
	request_users() {
	    $.ajax("/api/users", {
	      method: "get",
	      dataType: "json",
	      contentType: "application/json; charset=UTF-8",
	      success: (resp) => {
	      	store.dispatch({
	      		type: 'USERS_LIST',
	      		users: resp.data,
	      	});
	      },
	    });
	}

	request_tasks() {
	    $.ajax("/api/tasks", {
	      method: "get",
	      dataType: "json",
	      contentType: "application/json; charset=UTF-8",
	      success: (resp) => {
	      	store.dispatch({
	      		type: 'TASKS_LIST',
	      		tasks: resp.data,
	      	});
	      },
	    });
	}

	submit_login(data) {
	    $.ajax("/api/session", {
			method: "post",
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(data),
			success: (resp) => {
				console.log(resp);
				store.dispatch({
				    type: 'SET_TOKEN',
				    token: resp.token,
				});
				store.dispatch({
					type: 'SET_USER',
					user: resp.user,
				});
				store.dispatch({
					type: 'CLEAR_LOGIN_FORM',
					data: null,
				});
			},
	    });
	}

	submit_logout(data) {
		$.ajax({
	      type: 'delete',
	      url: "/api/session", 
	      success: (resp) => { 
	        store.dispatch({
		      type: 'SET_TOKEN',
		      token: '',
		    });
		    store.dispatch({
		      type: 'SET_USER',
		      user: '',
		    });
	      },
	      error: (resp) => {console.log(resp)},
	      });
	}

	register_user(data) {
		$.ajax("/api/users", {
			method: "post",
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify(data),
			success: (resp) => {
				console.log(resp);
				store.dispatch({
					type: 'UPDATE_INFO_BAR',
					data: "User Successfully Created!",
				});
				store.dispatch({
					type: 'CLEAR_REGISTER_FORM',
					data: null,
				});
			},
			error: (resp) => {
				store.dispatch({
					type: 'UPDATE_DANGER_BAR',
					data: resp.responseText,
				});
				console.log("Error: ", resp);
			},
	    });
	}

	new_task(task, token) {
		$.ajax("/api/tasks", {
		     type: 'post',
		     dataType: "json",
			 contentType: "application/json; charset=UTF-8",
		     data: JSON.stringify({task: task, token: token}),
		     success: (resp) => {
		     	store.dispatch({
					type: 'UPDATE_INFO_BAR',
					data: "Task Successfully Created!",
				}); 
				store.dispatch({
					type: 'CLEAR_TASK_FORM',
					data: null,
				});
		     	this.request_tasks();
		     },
		     error: (resp) => {
		     	store.dispatch({
					type: 'UPDATE_DANGER_BAR',
					data: resp.responseText,
				});
		     },
		   });
	} 

	update_task(task, token) {
		let task_id = task.id;
		task = _.pick(task, 'title', 'description', 'user_email', 'time', 'completed');

		$.ajax("/api/tasks/" + task_id, {
		     type: 'put',
		     dataType: "json",
			 contentType: "application/json; charset=UTF-8",
		     data: JSON.stringify({id: task_id, task: task, token: token}),
		     success: (resp) => {
		     	store.dispatch({
					type: 'UPDATE_INFO_BAR',
					data: "Task Successfully Updated!",
				}); 
				store.dispatch({
					type: 'CLEAR_TASK_FORM',
					data: null,
				});
		     	this.request_tasks();
		     },
		     error: (resp) => {
		     	store.dispatch({
					type: 'UPDATE_DANGER_BAR',
					data: resp.responseText,
				});
		     },
		   });
	}

	delete_task(task, token) {
		$.ajax({
	      type: 'delete',
	      url: "/api/tasks/" + task.id,
	      dataType: "json",
		  contentType: "application/json; charset=UTF-8", 
	      data: JSON.stringify({id: task.id, token: token}),
	      success: (resp) => {
	      	store.dispatch({
					type: 'UPDATE_INFO_BAR',
					data: "Task Deleted!",
			}); 
	      	this.request_tasks();
	      },
	      error: (resp) => {
	      	store.dispatch({
					type: 'UPDATE_DANGER_BAR',
					data: resp.responseText,
			});
	      },
	    });
	}

}

export default new TheServer();
