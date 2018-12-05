import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as scoreActions from '../actions/scoreActions';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ScoreList from '../components/score_list/score_list';


class PingPongScoreList extends Component {    
	componentWillMount() {
		this.props.scoreActions.fetchScores('pingpong');
	}

	render() {
		return (
		<div className="">
			{this.props.scores && this.props.scores.length > 0 ?
				<ScoreList scores={this.props.scores} />
				: <div className="text-center">No Games Found</div>
			}
		</div>
		);
	}
}

PingPongScoreList.propTypes = {
  scoreActions: PropTypes.object,
  scores: PropTypes.array
};

function mapStateToProps(state) {
	return {
		scores: state.app.scores
	};
}

function mapDispatchToProps(dispatch) {
	return {
		scoreActions: bindActionCreators(scoreActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PingPongScoreList);