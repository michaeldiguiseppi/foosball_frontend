import React, { Component } from 'react';
import Statistics from './statistics';
import { formatGameType } from '../../../utils/formatGameType';

class Matchups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game_type: '',
    }
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

  _renderScores = () => {
    const { game_type } = this.refs;
    const { users } = this.props; 
    // player 1
    const p1_id = this.refs.p1_id && this.refs.p1_id.value;
    const p1 = users && users.filter((user) => user.id === +p1_id)[0];
    const p1_name = p1 && `${p1.first_name} ${p1.last_name}`;
    // player 2
    const p2_id = this.refs.p2_id && this.refs.p2_id.value;
    const p2 = users && users.filter((user) => user.id === +p2_id)[0];
    const p2_name = p2 && `${p2.first_name} ${p2.last_name}`;

    if (p1 && p1_name && p2 && p2_name) {
      if (game_type && this.props[game_type.value] && this.props[game_type.value].length) {
        return this.props[game_type.value]
        .filter((game) => { 
          return (game.p1_name === p1_name && game.p2_name === p2_name) || (game.p2_name === p1_name && game.p1_name === p2_name);
         })
         .map((score) => {
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
      } 
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
    this.setState({
      game_type: this.refs.game_type.value,
    });
    this._renderScores();
  }

  render() {
    return (
      <div className="container">
        <h3>Matchup Stats</h3>
        <hr />
        <form className="form-horizontal" onSubmit={ this._getScores }>
          <fieldset>
            <div className="form-group">
              <div className="col-lg-3 col-sm-3 col-lg-offset-3 col-sm-offset-3">
                <select className="form-control text-center" id="select" required name="p1_id" ref="p1_id">
                  <option value="0"> -- Select a Player -- </option>
                  { this._renderUsers() }
                </select>
              </div>
              <div className="col-lg-3 col-sm-3">
                <select className="form-control text-center" id="select" required name="p2_id" ref="p2_id">
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
