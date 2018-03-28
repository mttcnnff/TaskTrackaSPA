
import React from 'react';
import { Link } from 'react-router-dom';

function User(params) {
  return <p>{params.user.name} - <Link to={"/users/" + params.user.id}>posts</Link></p>;
}

export default function Users(params) {
  let users = _.map(params.users, (uu) => <User key={uu.id} user={uu} />);
  return (
  <div className="container">
  	<div className="row">
  		<div className="col">
			<h2>Users</h2>
		</div>
	</div>
	<div className="row">
  		<div className="col">
			{ users }
		</div>
	</div>
  </div>

  );
}