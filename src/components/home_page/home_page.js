import React, { Component } from 'react';
import Matchups from './matchups/matchups';
import AddScore from './add_score';

class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <AddScore 
          users={ this.props.users } 
          scoreActions={ this.props.scoreActions }
          userActions={ this.props.userActions }
          />
        <hr />
        <Matchups 
          users={ this.props.users }
          scores_by_players={ this.props.scores_by_players }
          scoreActions={ this.props.scoreActions }
          userActions={ this.props.userActions }
        />
      </div>
    );
  }
}

export default HomePage;
