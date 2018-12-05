import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import * as scoreActions from '../actions/scoreActions';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import HomePage from '../components/home_page/home_page';



class HomePageContainer extends Component {    
	componentWillMount() {
		this.props.userActions.fetchUsers();
	}

	render() {
		return (
		<div className="">
			{this.props.users.length > 0 ?
				<HomePage 
					users={ this.props.users } 
					getScoresByPlayers={ this.props.scoreActions.getScoresByPlayers }
					addScore={ this.props.scoreActions.addScores }
					scores_by_players={ this.props.scores_by_players }
				/>
				: <div></div>
			}
		</div>
		);
	}
}

HomePageContainer.propTypes = {
  userActions: PropTypes.object,
  users: PropTypes.array
};

function mapStateToProps(state) {
	return {
		users: state.app.users,
		scores: state.app.scores,
		scores_by_players: state.app.scores_by_players
	};
}

function mapDispatchToProps(dispatch) {
	return {
		userActions: bindActionCreators(userActions, dispatch),
		scoreActions: bindActionCreators(scoreActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePageContainer);