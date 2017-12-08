import React, { Component } from 'react';

class ScoreList extends Component {
  constructor(props) {
    super(props);
    let baseUrl = "https://superior-foos-api.herokuapp.com";
    let proxyUrl = "https://floating-bayou-91674.herokuapp.com/";

    this.state = {
      scores: [],
      baseUrl: baseUrl,
      proxyUrl: proxyUrl,
    }
  }

  componentDidMount() {
    this._getScores();
  }

  _getScores() {
    return fetch(this.state.proxyUrl + this.state.baseUrl + "/v1/scores")
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
    if (this.state.scores && this.state.scores.length) {
      let game_number = 0
      return this.state.scores.map((score) => {
        return (
          <tr key={ score.p1_name + score.id }>
            <td>{ ++game_number }</td>
            <td>{ score.p1_name }</td>
            <td>{ score.p1_score }</td>
            <td>{ score.p2_score }</td>
            <td>{ score.p2_name }</td>
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
              <th className="text-center">Game</th>
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
