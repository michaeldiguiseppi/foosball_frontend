import { ScoreTypes } from './actionTypes';


function baseUrl() {
	return process.env.REACT_APP_PROXY_URL + process.env.REACT_APP_BASE_URL;
}

export function getScoresByPlayers(players) {
	return dispatch => {
		dispatch({ type: ScoreTypes.FETCH_SCORES_BY_PLAYERS });
		return fetch(baseUrl() + '/scores', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(players)
		})
		.then((response) => {
			return response.json();
		})
		.then(json => dispatch(receiveScoresByPlayer(json)));
	}
}

export function receiveScoresByPlayer(json) {
	return { type: ScoreTypes.RECEIVE_SCORES_BY_PLAYERS, scores_by_players: json.scores };
}

export function addScores(scoreToAdd) {
	return dispatch => {
		return fetch(baseUrl() + '/scores/add', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(scoreToAdd)
		})
		.then((response) => {
			return response.json();
		})
		.then(json => dispatch(fetchScores(scoreToAdd.game_type)));
	}
}

export function receiveScores(json) {
	return { type: ScoreTypes.RECEIVE_SCORES, scores: json.scores };
}

export function fetchScores(game_type) {
	return dispatch => {
		dispatch({ type: ScoreTypes.FETCH_SCORES });
		let url = '';
		if (game_type !== undefined) {
			url = `${baseUrl()}/scores/${game_type}`;
		} else {
			url = `${baseUrl()}/scores`;
		}
		return fetch(url, {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		})
		.then((response) => {
			return response.json();
		})
		.then(json => dispatch(receiveScores(json)));
	};
}

