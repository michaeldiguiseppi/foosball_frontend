import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as scoreActions from '../actions/scoreActions';
import ScoreList from '../components/score_list/score_list';

function mapStateToProps(state) {
	return {
		scores: state.app.scores && state.app.scores.foosball,
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