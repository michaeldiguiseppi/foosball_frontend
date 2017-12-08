import React, { Component } from 'react';
require('../../index.css');

class AddPlayers extends Component {
  constructor(props) {
	super(props);

	// let baseUrl = "https://superior-foos-api.herokuapp.com";
	let baseUrl = process.env.REACT_APP_BASE_URL;
	let proxyUrl = process.env.REACT_APP_PROXY_URL;
	// let proxyUrl = "https://floating-bayou-91674.herokuapp.com/";
	


    this.state = {
	  players: [],
	  baseUrl: baseUrl,
	  proxyUrl: proxyUrl,
	}
	
	this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    this._getPlayers();
  }

  _getPlayers() {
	return fetch(this.state.proxyUrl + this.state.baseUrl + '/v1/users')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          players: responseJson.users,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _renderPlayers() {
	return this.state.players.map((player) => {
		return (
		  <tr key={ player.first_name + player.id }>
			<td>{ player.first_name }</td>
			<td>{ player.last_name }</td>
			<td>{ player.is_admin ? "Yes" : "No" }</td>
		  </tr>
		)
	  });
  }



  _handleSubmit(event) {
	event.preventDefault();
	let newPlayer = {
		  first_name: this.refs.first_name.value,
		  last_name: this.refs.last_name.value,
		  is_admin: this.refs.is_admin.checked,
	  }

	console.log(newPlayer);


	return fetch(this.state.proxyUrl + this.state.baseUrl + '/v1/users', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newPlayer)
		})
		.then((response) => {
			this._getPlayers();
			this.refs.first_name.value = '';
			this.refs.last_name.value = '';
			this.refs.is_admin.checked = false;
		});
  }


  render() {
    return (
      <div className="AddPlayers container">
        <header className="AddPlayers-header">
          <h1 className="AddPlayers-title text-center">Current Players</h1>
        </header>
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th className="text-center">First Name</th>
              <th className="text-center">Last Name</th>
			  <th className="text-center">Admin?</th>
            </tr>
          </thead>
          <tbody>
            { this._renderPlayers() }
          </tbody>
        </table>
		<div className="container">
        <h3 className="text-center">Add Players</h3>
        <hr />
        <form className="form-horizontal" onSubmit={ this._handleSubmit } name="player">
          <fieldset>
            <div className="form-group text-center">
              <div className="col-lg-3 col-sm-3 col-lg-offset-3 col-sm-offset-3">
				<input className="form-control text-center" type="text" placeholder="First Name" name="first_name" ref="first_name" autoComplete="off"/>
              </div>
              <div className="col-lg-3 col-sm-3">
			  	<input className="form-control text-center" type="text" placeholder="Last Name" name="last_name" ref="last_name" autoComplete="off"/>
              </div>
            </div>
			<div className="col-lg-2 col-sm-2 col-lg-offset-5 col-sm-offset-5"><label htmlFor="is_admin"><input className="aligned-checkbox" name="is_admin" type="checkbox" ref="is_admin"/>Is Admin</label></div>
            <div className="form-group text-center">
              <div className="col-lg-4 col-lg-offset-4 col-sm-4 col-sm-offset-4">
                <button type="reset" className="btn btn-default">Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      </div>
    );
  }
}

export default AddPlayers;
