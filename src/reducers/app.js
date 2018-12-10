import initialState from './initialState';
import { ScoreTypes, UserTypes } from '../actions/actionTypes';

export default function app(state = initialState, action) {
	let newState;
	switch (action.type) {
		case ScoreTypes.FETCH_SCORES: 
			return action;
		case ScoreTypes.RECEIVE_SCORES:
			newState = Object.assign({}, state, {
				scores: {
					foosball: action.scores.filter(score => score.game_type === 'foosball'),
					pingpong: action.scores.filter(score => score.game_type === 'pingpong'),
				}
			});
			return newState;
		case ScoreTypes.ADD_SCORE:
			return action;
		case ScoreTypes.FETCH_SCORES_BY_PLAYERS:
			return action;
		case ScoreTypes.RECEIVE_SCORES_BY_PLAYERS:
			newState = Object.assign({}, state, { scores_by_players: action.scores_by_players });
			return newState;
		case ScoreTypes.SET_GAME_TYPE:
			newState = Object.assign({}, state, { game_type: action.game_type })
			return newState;
		case UserTypes.FETCH_USERS:
			return action;
		case UserTypes.RECEIVE_USERS:
			newState = Object.assign({}, state, { users: action.users });
			return newState;
		case UserTypes.ADD_USER:
			return action;
		default:
			return state;
	}
}