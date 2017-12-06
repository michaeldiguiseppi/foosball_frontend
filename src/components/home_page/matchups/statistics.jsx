import React, { Component } from 'react';

class Statistics extends Component {
	constructor(props) {
		super(props);
		this.calculateStats = this.calculateStats.bind(this);
	}

	calculateStats() {
		let { scores, playerOne, playerTwo } = this.props;
		let p1_total_points = 0, 
			p1_win_percent,
			p1_total_wins,
			p1_lose_by = 0,
			p1_scores,
			p2_total_points = 0, 
			p2_win_percent,
			p2_total_wins,
			p2_lose_by = 0,
			p2_scores;
		// Get p1_win games
		p1_scores = scores.filter((score) => {
			return (score.p1_name === playerOne && score.p1_score === 10) || (score.p2_name === playerOne && score.p2_score === 10);
		});
		// calculate p1 win percentage
		p1_win_percent = (p1_scores.length / scores.length * 100).toFixed(2);
		// calculate p1 total wins
		p1_total_wins = p1_scores.length;
		// get p2_win games
		p2_scores = scores.filter((score) => {
			return (score.p1_name === playerTwo && score.p1_score === 10) || (score.p2_name === playerTwo && score.p2_score === 10);
		});
		// calculate p2 win percentage
		p2_win_percent = (p2_scores.length / scores.length * 100).toFixed(2);
		// calculate p2 total wins
		p2_total_wins = p2_scores.length;
		// get total points for both players
		scores.forEach((score) => {
			if (score.p1_name === playerOne)
				p1_total_points += score.p1_score;
			if (score.p2_name === playerOne)
				p1_total_points += score.p2_score;
			if (score.p1_name === playerTwo)
				p2_total_points += score.p1_score;
			if (score.p2_name === playerTwo)
				p2_total_points += score.p2_score;
		});
		// get p1_lose_by amounts
		p2_scores.forEach((score) => {
			if (score.p1_name === playerOne)
				p1_lose_by += score.p1_score;
			if (score.p2_name === playerOne)
				p1_lose_by += score.p2_score;
		});
		p1_lose_by = (p1_lose_by / p2_scores.length).toFixed(2);
		p1_scores.forEach((score) => {
			if (score.p1_name === playerTwo)
				p2_lose_by += score.p1_score;
			if (score.p2_name === playerTwo)
				p2_lose_by += score.p2_score;
		});
		p2_lose_by = (p2_lose_by / p1_scores.length).toFixed(2);
		return (
			<table className="table table-striped text-center">
				<thead>
					<tr>
						<th className="text-center">Player</th>
						<th className="text-center">Win Percentage</th>
						<th className="text-center">Total Wins</th>
						<th className="text-center">Total Points</th>
						<th className="text-center">Average Points / Loss</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{ playerOne }</td>
						<td>{ p1_win_percent }%</td>
						<td>{ p1_total_wins }</td>
						<td>{ p1_total_points }</td>
						<td>{ p1_lose_by }</td>
					</tr>
					<tr>
						<td>{ playerTwo }</td>
						<td>{ p2_win_percent }%</td>
						<td>{ p2_total_wins }</td>
						<td>{ p2_total_points }</td>
						<td>{ p2_lose_by }</td>
					</tr>
				</tbody>
			</table>
		)
	}

	render() {
		console.log(this.props);
		return (<div>
			{ this.calculateStats() }
		</div>);
	}
}

export default Statistics;