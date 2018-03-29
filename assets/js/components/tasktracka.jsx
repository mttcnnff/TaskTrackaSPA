import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';
import Feed from './feed';
import Users from './users';
import Login from './login';
import Register from './register';
import Tasks from './tasks';
import { history } from 'react-router-dom';
import * as Alerts from './alert';


export default function tasktracka_init() {
  let root = document.getElementById('root');
  ReactDOM.render(<TaskTracka />, root);
}

class TaskTracka extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };

    this.get_session();
    // this.request_posts();
    this.request_users();
  }

  get_session() {
    $.ajax({
        type: 'get',
        url: "/api/session", 
        success: (resp) => { 
          this.setState(_.extend(this.state, { user: resp.data }));
        }
    });
  }

  request_users() {
    $.ajax("/api/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        this.setState(_.extend(this.state, { users: resp.data }));
      },
    });
  }

  login(event) {
    event.preventDefault();

    const formData = $('#login').serialize();
    console.log(formData);

    $.ajax({
      type: 'post',
      url: "/api/session", 
      data: formData,
      success: (resp) => { 

        this.setState(_.extend(this.state, { user: resp.data }));
        Alerts.flashAlert("Welcome back " + this.state.user.name + "!");

      },
      error: (resp) => {Alerts.flashDanger(resp.responseText)},
      });
  }


  logout() {
    $.ajax({
      type: 'delete',
      url: "/api/session", 
      success: (resp) => { 
        this.setState(_.extend(this.state, { user: undefined }))
      },
      error: (resp) => {console.log(resp)},
      });
  }

  render() {
    console.log("User: ", this.state.user);
    console.log("Users: ", this.state.users);
    return (
      <Router>
        <div>
          <Nav user={this.state.user} logout={() => this.logout()} />
          <Route path="/" exact={true} render={
            () => this.state.user ? <Tasks users={this.state.users} /> : <Login login={(event) => this.login(event)} />
          } />
          <Route path="/register" exact={true} render={() =>
            <Register />
          } />
        </div>
      </Router>
    );


    // return this.state.user ? 
    // (
    //   <Router>
    //     <div>
    //       <Nav user={this.state.user} logout={() => this.logout()} />
    //       <Route path="/" exact={true} render={() => <Home /> } />
    //       <Route path="/users" exact={true} render={() =>
    //         <Users users={this.state.users} />
    //       } />
    //       <Route path="/users/:user_id" render={({match}) =>
    //         <Feed posts={_.filter(this.state.posts, (pp) =>
    //           match.params.user_id == pp.user.id )
    //         } />
    //       } />
    //       <Route path="/register" exact={true} render={() =>
    //         <Register />
    //       } />
    //     </div>
    //   </Router>
    // )
    // : 
    // (
    //   <Router>
    //     <div>
    //       <Nav user={this.state.user}/>
    //       <Route path="/" exact={true} render={() => <Login login={(event) => this.login(event)} />} />
    //       <Route path="/register" exact={true} render={() =>
    //         <Register />
    //       } />
    //     </div>
    //   </Router>
    // );
  }
}