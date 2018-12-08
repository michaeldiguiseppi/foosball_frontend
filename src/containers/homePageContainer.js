import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import * as scoreActions from '../actions/scoreActions';
import HomePage from '../components/home_page/home_page';

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
)(HomePage);