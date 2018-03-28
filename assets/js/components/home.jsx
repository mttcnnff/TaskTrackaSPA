import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

function Home(params) {
  	return (
	  	<div className="container">
		  	<div className="row">
		  		<div className="col">
		  			<h2>Home</h2>
				</div>
			</div>
		</div>

  );
}

export default withRouter(Home);