import { UserTypes } from './actionTypes';

function baseUrl() {
	return process.env.REACT_APP_PROXY_URL + process.env.REACT_APP_BASE_URL;
}

export function addUser(userToAdd) {
	return dispatch => {
		return fetch(baseUrl() + '/users', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userToAdd)
		})
		.then((response) => {
			return response.json();
		})
		.then(json => dispatch(fetchUsers()));
	}
}

export function receiveUsers(json) {
	return { type: UserTypes.RECEIVE_USERS, users: json.users };
}

export function fetchUsers() {
	return dispatch => {
		return fetch(baseUrl() + '/users', {
			method: 'GET',
			headers: {
				'Accept': 'application/json'
			}
		})
		.then((response) => {
			return response.json();
		})
		.then(json => dispatch(receiveUsers(json)));
	};
}

