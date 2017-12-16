import React, { Component } from 'react';
import Matchups from './matchups/matchups';
import AddScore from './add_score';

class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <AddScore 
          users={ this.props.users } 
          addScore={ this.props.addScore }
          />
        <hr />
        <Matchups 
          users={ this.props.users }
          getScoresByPlayers={ this.props.getScoresByPlayers }
          scores_by_players={ this.props.scores_by_players }
          addScore={ this.props.addScore }
        />
      </div>
    );
  }
}

export default HomePage;
