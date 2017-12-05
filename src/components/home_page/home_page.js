import React, { Component } from 'react';
import Matchups from './matchups/matchups';
import AddScore from './add_score';

class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <AddScore />
        <hr />
        <Matchups />
      </div>
    );
  }
}

export default HomePage;
