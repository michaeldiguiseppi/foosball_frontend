import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import * as scoreActions from '../actions/scoreActions';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Stats from '../components/stats/stats';



class StatsContainer extends Component {    
	componentWillMount() {
		this.props.userActions.fetchUsers();
		this.props.scoreActions.fetchScores();
	}

	render() {
		return (
		<div className="">
			{this.props.users && this.props.users.length > 0 && this.props.scores && this.props.scores.length > 0 ?
				<Stats
					users={this.props.users}
					scores={this.props.scores}
				 />
				: <div></div>
			}
		</div>
		);
	}
}

StatsContainer.propTypes = {
  userActions: PropTypes.object,
  scoreActions: PropTypes.object,
  users: PropTypes.array,
  scores: PropTypes.array
};

function mapStateToProps(state) {
	return {
		users: state.app.users,
		scores: state.app.scores,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		userActions: bindActionCreators(userActions, dispatch),
		scoreActions: bindActionCreators(scoreActions, dispatch),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StatsContainer);