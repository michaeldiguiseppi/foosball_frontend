import React, { Component } from 'react';

class Stats extends Component {
	constructor(props) {
		super(props);
		let baseUrl = process.env.REACT_APP_BASE_URL;
		let proxyUrl = process.env.REACT_APP_PROXY_URL;
		this.state = {
			players: [],
			baseUrl: baseUrl,
			proxyUrl: proxyUrl,
			massStats: [],
			game_type: 'pingpong',
		}
	}

	componentDidMount() {
		const { scoreActions, userActions } = this.props;
		const { fetchScores } = scoreActions;
		const { fetchUsers } = userActions;
		fetchScores().then(() => fetchUsers().then(() => this.calculateStats()));
	}

	calculateWinPercentage = (player) => {
		let winPercent = 0;
		let playerGames = this.getPlayerGames(player, this.state.game_type);
		let totalWins = this.calculateTotalWins(player);
		if (playerGames.length === 0) {
			winPercent = 0;
		} else {
			winPercent = ((totalWins / playerGames.length) * 100);
		}
		return winPercent.toFixed(1);
	}

	calculateLoseBy = (player) => {
		let loseBy = 0;
		let playerGames = this.getPlayerGames(player, this.state.game_type);
		playerGames.forEach((game) => {
			if (game.p1_name === player && (game.p1_score < game.p2_score)) {
				loseBy += game.p1_score;
			} else if (game.p2_name === player && (game.p2_score < game.p1_score)) {
				loseBy += game.p2_score;
			}
		});
		let playerWins = this.calculateTotalWins(player);
		if (playerGames.length === 0){
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
		let playerGames = this.getPlayerGames(player, this.state.game_type);

		playerGames.forEach((game) => {
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
		let playerGames = this.getPlayerGames(player, this.state.game_type);

		playerGames.forEach((game) => {
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
		const { game_type } = this.state;
		let totalWins = 0;
		let playerScores = this.props.scores[game_type].filter((score) => {
			return ((score.p1_name === player && score.p1_score === 10) || (score.p2_name === player && score.p2_score === 10))
		});
		totalWins = playerScores.length;
		return totalWins;
	}

	getPlayerGames = (player, game_type) => {
		return this.props.scores[game_type].filter((game) => {
			return game.p1_name === player || game.p2_name === player;
		});
	}

	calculateStats = () => {
		let stats = [];
		this.props.users.forEach((player) => {
			player.name = `${player.first_name} ${player.last_name}`;
			stats.push({
				name: player.name,
				totalWins: this.calculateTotalWins(player.name),
				winPercentage: this.calculateWinPercentage(player.name),
				loseBy: this.calculateLoseBy(player.name),
				pointsFor: this.calculateTotalPointsFor(player.name),
				pointsAgainst: this.calculateTotalPointsAgainst(player.name),
				games: this.getPlayerGames(player.name, this.state.game_type),
			});
		});

		return this.setState({
			massStats: stats
		});
	}

	renderStats = () => {
		if (this.state.massStats && this.state.massStats.length) {
			return this.state.massStats.map((stat) => {
				if (stat.games.length > 0) {
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
		this.setState({
			game_type: this.refs.game_type.value
		});
		this.calculateStats();
	}

	render() {
		console.warn(this.state);
		return (
		<div>
			<form onChange={() => { this._changeDisplayOption() } }>
				<div className="form-group">
					<div className="col-lg-4 col-lg-offset-4 col-sm-4 col-sm-offset-4 pad-top">
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

export default Stats;