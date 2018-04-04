import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
	this.state = {
      users: [],
      tasks: []
    };
*/

function users(state = [], action) {
	switch (action.type) {
		case 'USERS_LIST':
			return [...action.users];
		default:
			return state;
	}
}

function user(state = '', action) {
	switch (action.type) {
		case 'SET_USER':
			return action.user;
		default:
			return state;
	}
}

function tasks(state = [], action) {
	switch (action.type) {
		case 'TASKS_LIST':
			return [...action.tasks];
		default:
			return state;
	}
}

function token(state = null, action) {
    switch (action.type) {
	    case 'SET_TOKEN':
	        return action.token;
	    default:
	        return state;
    }
}

let empty_login = {
	email: "",
	password: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_LOGIN_FORM':
      return Object.assign({}, state, empty_login);
    default:
      return state;
  }
}

let empty_register = {
	email: "",
	name: "",
	password: "",
	password_confirmation: "",
}

function register(state = empty_register, action) {
	switch (action.type) {
		case 'UPDATE_REGISTER_FORM':
			return Object.assign({}, state, action.data);
		case 'CLEAR_REGISTER_FORM':
			return Object.assign({}, state, empty_register);
		default:
			return state;
	}
}

let empty_flash = {
	info: "",
	danger: "",
}

function flash(state = empty_flash, action) {
	switch (action.type) {
		case 'UPDATE_INFO_BAR':
			console.log("Updating");
			return Object.assign({}, state, {info: action.data});
		case 'UPDATE_DANGER_BAR':
			return Object.assign({}, state, {danger: action.data});
		case 'CLEAR_INFO_BAR':
			return Object.assign({}, state, {info: ""});
		case 'CLEAR_DANGER_BAR':
			return Object.assign({}, state, {danger: ""});
		default:
			return state;
	}
}

let empty_task_form = {
	id: "",
	title: "",
	description: "",
	user_email: "",
	time: "",
	completed: false,
}

function taskform(state = empty_task_form, action) {
	switch (action.type) {
		case 'UPDATE_TASK_FORM':
			return Object.assign({}, state, action.data);
		case 'CLEAR_TASK_FORM':
			return Object.assign({}, state, empty_task_form);
		default:
			return state;
	}
}

function root_reducer(state0, action) {
	console.log("reducer", action);

	let reducer = combineReducers({users, tasks, user, token, login, register, flash, taskform});
	let state1 = reducer(state0, action);
	console.log("state1", state1);
	return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
