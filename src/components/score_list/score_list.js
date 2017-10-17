import React, { Component } from 'react';

class ScoreList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores: [],
    }
  }

  componentDidMount() {
    this._getScores();
  }

  _getScores() {
    return fetch("http://localhost:9002/v1/scores")
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          scores: responseJson.scores
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _renderScores() {
    return this.state.scores.map((score) => {
      return (
        <tr key={ score.p1_name + score.id }>
          <td>{ score.p1_name }</td>
          <td>{ score.p1_score }</td>
          <td>{ score.p2_score }</td>
          <td>{ score.p2_name }</td>
        </tr>
      )
    });
  }

  render() {
    console.log(this.state.scores);
    return (
      <div className="ScoreList container">
        <header className="ScoreList-header">
          <h1 className="ScoreList-title text-center">All Scores</h1>
        </header>
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th className="text-center">Player 1 Name</th>
              <th className="text-center">Player 1 Score</th>
              <th className="text-center">Player 2 Score</th>
              <th className="text-center">Player 2 Name</th>
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
