import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../../actions/userActions';
import { fetchScores, addScore, setGameType } from '../../actions/scoreActions';
import Matchups from './matchups/matchups';
import AddScore from './add_score';

class HomePage extends Component {
  componentDidMount() {
    const { fetchUsers, fetchScores } = this.props;
    fetchUsers();
    fetchScores();
  }

  render() {
    return (
      <div className="container">
        <AddScore 
          {...this.props}
        />
        <hr />
        <Matchups 
          {...this.props}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	const users = state.app.users;
  const foosball = state.app.scores && state.app.scores.foosball;
  const pingpong = state.app.scores && state.app.scores.pingpong;

	return {
		users,
    foosball,
    pingpong,
	}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUsers, fetchScores, addScore, setGameType }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
// export default HomePage;
