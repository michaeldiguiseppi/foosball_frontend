import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import * as scoreActions from '../actions/scoreActions';
import Stats from '../components/stats/stats';

function mapStateToProps(state) {
	return {
		users: state.app.users,
		scores: {
			foosball: state.app.scores && state.app.scores.filter(score => score.game_type === 'foosball'),
			pingpong: state.app.scores && state.app.scores.filter(score => score.game_type === 'pingpong'),
		}
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
)(Stats);