import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../../actions/userActions';
import { fetchScores, addScore, setGameType } from '../../actions/scoreActions';

export class Stats extends Component {
	constructor(props) {
		super(props);
		this.state = {
			game_type: '',
		}
	}
	componentDidMount() {
		const { fetchUsers, fetchScores } = this.props;
		fetchUsers();
		fetchScores();
		this.setState({ game_type: this.refs.game_type.value });
	}

	getPlayerGames = (player) => {
		const game_type = this.refs.game_type.value;
		return this.props[game_type] && this.props[game_type].length && this.props[game_type].filter((game) => {
			return game.p1_name === player || game.p2_name === player;
		});
	}

	calculateWinPercentage = (player) => {
		let winPercent = 0;
		let playerGames = this.getPlayerGames(player);
		let totalWins = this.calculateTotalWins(player);
		if (playerGames && playerGames.length === 0) {
			winPercent = 0;
		} else {
			if (playerGames && playerGames.length) {
				winPercent = ((totalWins / playerGames.length) * 100);
			}
		}
		return winPercent.toFixed(1);
	}

	calculateLoseBy = (player) => {
		let loseBy = 0;
		let playerGames = this.getPlayerGames(player);
		playerGames && playerGames.forEach((game) => {
			if (game.p1_name === player && (game.p1_score < game.p2_score)) {
				loseBy += game.p1_score;
			} else if (game.p2_name === player && (game.p2_score < game.p1_score)) {
				loseBy += game.p2_score;
			}
		});
		let playerWins = this.calculateTotalWins(player);
		if (playerGames && playerGames.length === 0){
			return 0;
		}
		if (loseBy === 0) {
			return "N/A";
		}
		loseBy = (loseBy / (playerGames.length - playerWins)).toFixed(2);
		return loseBy;
	}

	calculateTotalPointsFor = (player) => {
		let pointsFor = 0;
		let playerGames = this.getPlayerGames(player);

		playerGames && playerGames.forEach((game) => {
			if (game.p1_name === player) {
				pointsFor += game.p1_score;
			} else if (game.p2_name === player) {
				pointsFor += game.p2_score;
			}
			return pointsFor;
		});
		return pointsFor;
	}

	calculateTotalPointsAgainst = (player) => {
		let pointsAgainst = 0;
		let playerGames = this.getPlayerGames(player);

		playerGames && playerGames.forEach((game) => {
			if (game.p1_name !== player) {
				pointsAgainst += game.p1_score;
			} else if (game.p2_name !== player) {
				pointsAgainst += game.p2_score;
			}
			return pointsAgainst;
		});
		return pointsAgainst;
	}

	calculateTotalWins = (player) => {
		const game_type = this.refs.game_type.value;
		let totalWins = 0;
		if (this.props[game_type]) {
			let playerScores = this.props[game_type] && this.props[game_type].filter((score) => {
				return ((score.p1_name === player && score.p1_score > score.p2_score) || (score.p2_name === player && score.p2_score > score.p1_score))
			});
			totalWins = playerScores.length;
		}
		
		return totalWins;
	}



	calculateStats = () => {
		let stats = [];
		this.props.users && this.props.users.forEach((player) => {
			player.name = `${player.first_name} ${player.last_name}`;
			stats.push({
				name: player.name,
				totalWins: this.calculateTotalWins(player.name),
				winPercentage: this.calculateWinPercentage(player.name),
				loseBy: this.calculateLoseBy(player.name),
				pointsFor: this.calculateTotalPointsFor(player.name),
				pointsAgainst: this.calculateTotalPointsAgainst(player.name),
				games: this.getPlayerGames(player.name),
			});
		});
		return stats;
	}

	renderStats = () => {
		const stats = this.calculateStats();
		if (stats && stats.length) {
			return stats.map((stat) => {
				if (stat.games && stat.games.length > 0) {
					return (
						<tr key={ stat.name + stat.winPercentage }>
							<td>{ stat.name }</td>
							<td>{ stat.winPercentage }%</td>
							<td>{ stat.totalWins }</td>
							<td>{ stat.games.length }</td>
							<td>{ stat.pointsFor }</td>
							<td>{ stat.pointsAgainst }</td>
							<td>{ stat.loseBy > 0 ? stat.loseBy : 'N/A' }</td>
						</tr>
					)
				}
				return null;
			});
		}
	}

	_changeDisplayOption = () => {
		this.setState({ game_type: this.refs.game_type.value });
		this.renderStats();
	}

	render() {
		return (
		<div>
			<form onChange={this._changeDisplayOption}>
				<div className="form-group">
					<div className="col-lg-6 col-lg-offset-3 col-sm-6 col-sm-offset-3 pad-top">
						<select className="form-control text-center" id="select" name="game_type" ref="game_type" defaultValue="pingpong">
							<option value="pingpong" className="text-center">Ping Pong</option>
							<option value="foosball" className="text-center">Foosball</option>
						</select>
					</div>
				</div>
			</form>
			<table className="table table-striped table-hover text-center">
				<thead>
					<tr>
						<th className="text-center">Player Name</th>
						<th className="text-center">Win Percentage</th>
						<th className="text-center">Total Wins</th>
						<th className="text-center">Total Games</th>
						<th className="text-center">Points For</th>
						<th className="text-center">Points Against</th>
						<th className="text-center">Average Points / Loss</th>
					</tr>
				</thead>
				<tbody>
					{ this.renderStats() }
				</tbody>
			</table>
		</div>);
	}
}

const mapStateToProps = (state) => {
	const users = state.app.users;
	const foosball = state.app.scores && state.app.scores.foosball;
	const pingpong = state.app.scores && state.app.scores.pingpong;

	return {
		users,
		foosball,
		pingpong,
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ fetchUsers, fetchScores, addScore, setGameType }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);