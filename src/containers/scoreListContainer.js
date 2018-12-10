import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as scoreActions from '../actions/scoreActions';
import ScoreList from '../components/score_list/score_list';

function mapStateToProps(state) {
	let scores = [];
	if (state.app.scores && state.app.scores.foosball && state.app.scores.pingpong) {
		scores.push(...state.app.scores.foosball);
		scores.push(...state.app.scores.pingpong);
	}
	return {
		scores,
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
)(ScoreList);