import React, { Component } from 'react';

class ScoreList extends Component {
  componentDidMount() {
    const { scoreActions } = this.props;
    const { fetchScores } = scoreActions;
    fetchScores();
  }

  _renderScores() {
    if (this.props.scores && this.props.scores.length) {
      let game_number = 0;
      return this.props.scores.map((score) => {
        return (
          <tr key={ score.p1_name + score.id }>
            <td>{ ++game_number }</td>
            <td>{ score.p1_name }</td>
            <td>{ score.p1_score }</td>
            <td>{ score.p2_score }</td>
            <td>{ score.p2_name }</td>
            <td>{ this.formatGameType(score.game_type) }</td>
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
        </tr>
        )
    }
  }

  formatGameType = (game_type) => {
    if (game_type === 'pingpong') {
      return 'Ping Pong';
    } else if (game_type === 'foosball') {
      return 'Foosball';
    } else {
      return 'Not Specified';
    }
  } 

  render() {
    return (
      <div className="ScoreList container">
        <header className="ScoreList-header">
          <h1 className="ScoreList-title text-center">All Scores</h1>
        </header>
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th className="text-center">Game</th>
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

export default ScoreList;
