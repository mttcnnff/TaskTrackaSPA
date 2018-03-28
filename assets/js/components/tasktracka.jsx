import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';
import Feed from './feed';
import Users from './users';
import Login from './login';
import Register from './register';

export default function tasktracka_init() {
  let root = document.getElementById('root');
  ReactDOM.render(<TaskTracka />, root);
}

class TaskTracka extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      users: [],
    };

    // this.request_posts();
    // this.request_users();
  }

  request_posts() {
    $.ajax("/api/v1/posts", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        this.setState(_.extend(this.state, { posts: resp.data }));
      },
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route path="/" exact={true} render={() => <Login />} />
          <Route path="/users" exact={true} render={() =>
            <Users users={this.state.users} />
          } />
          <Route path="/users/:user_id" render={({match}) =>
            <Feed posts={_.filter(this.state.posts, (pp) =>
              match.params.user_id == pp.user.id )
            } />
          } />
          <Route path="/register" exact={true} render={() =>
            <Register />
          } />
        </div>
      </Router>
    );
  }
}