import React, { Component } from 'react';
import Statistics from './statistics';
import { formatGameType } from '../../../utils/formatGameType';

class Matchups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      comparePlayers: {
        p1_id: 0,
        p2_id: 0,
        game_type: 'pingpong',
      },
	  scores: [],
	  message: {},
    }
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  _renderUsers = () => {
    if (this.props.users && this.props.users.length) {
      return this.props.users.map((user) => {
        return (
          <option value={ user.id } key={ user.first_name + user.id }>{ user.first_name } { user.last_name }</option>
        )
      });
    }
  }
  
  handleCompareChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      comparePlayers: {
        ...this.state.comparePlayers,
        [name]: +value,
      }
    });
  }

  _renderScores = () => {
	  if (this.props.scores_by_players && this.props.scores_by_players.length) {
      return this.props.scores_by_players.map((score) => {
        return (
          <tr key={ score.p1_name + score.id }>
            <td>{ score.p1_name }</td>
            <td>{ score.p1_score }</td>
            <td>{ score.p2_score }</td>
            <td>{ score.p2_name }</td>
            <td>{ formatGameType(score.game_type) }</td>
          </tr>
        )
			});
	  } else {
		  return (
		  <tr>
			  <td></td>
			  <td>No Scores Available</td>
			  <td>No Scores Available</td>
			  <td></td>
        <td></td>
		  </tr>
		  )
	  }
  }

  _getScores = (event) => {
	  event.preventDefault()
    if (this.state.comparePlayers.p1_id === 0 || this.state.comparePlayers.p2_id === 0) {
      return;
    }
    return this.props.scoreActions.getScoresByPlayers(this.state.comparePlayers);
  }

  _resetScores = () => {
	this.setState({
			comparePlayers: {
				p1_id: 0,
				p2_id: 0,
			},
		});
  }

  render() {
    console.warn(this.props);
    return (
      <div className="container">
        <h3>Matchup Stats</h3>
        <hr />
        <form className="form-horizontal" onSubmit={ this._getScores }>
          <fieldset>
            <div className="form-group">
              <div className="col-lg-3 col-sm-3 col-lg-offset-3 col-sm-offset-3">
                <select className="form-control text-center" id="select" required name="p1_id" value={ this.state.comparePlayers.p1_id } onChange={ this.handleCompareChange }>
                  <option value="0"> -- Select a Player -- </option>
                  { this._renderUsers() }
                </select>
              </div>
              <div className="col-lg-3 col-sm-3">
                <select className="form-control text-center" id="select" required name="p2_id" value={ this.state.comparePlayers.p2_id } onChange={ this.handleCompareChange }>
                  <option value="0"> -- Select a Player -- </option>
                  { this._renderUsers() }
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-lg-4 col-lg-offset-4 col-sm-4 col-sm-offset-4 pad-top">
                <select className="form-control text-center" id="select" name="game_type" ref="game_type" defaultValue="pingpong">
                  <option value="foosball" className="text-center">Foosball</option>
                  <option value="pingpong" className="text-center">Ping Pong</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-lg-4 col-lg-offset-4 col-sm-4 col-sm-offset-4">
                <button type="reset" className="btn btn-default" onClick={ this._resetScores }>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </fieldset>
        </form>
        <hr />
		{ this.props.scores_by_players && this.props.scores_by_players.length ? 
      <Statistics 
        scores={ this.props.scores_by_players }
        playerOne={ this.props.scores_by_players[0].p1_name || "" }
        playerTwo={ this.props.scores_by_players[0].p2_name || "" }
      /> : <div>No Statistics Available</div> 
    }
		<hr />
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th className="text-center">Player 1 Name</th>
              <th className="text-center">Player 1 Score</th>
              <th className="text-center">Player 2 Score</th>
              <th className="text-center">Player 2 Name</th>
              <th className="text-center">Game Type</th>
            </tr>
          </thead>
          <tbody>
            { this._renderScores() }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Matchups;
