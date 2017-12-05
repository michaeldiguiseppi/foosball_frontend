import React, { Component } from 'react';

class Statistics extends Component {
	constructor(props) {
		super(props);
		this.calculateWinPercent = this.calculateWinPercent.bind(this);
	}

	calculateWinPercent() {
		let { scores, playerOne, playerTwo } = this.props;
		
		let p1_scores = scores.filter((score) => {
			return (score.p1_name === playerOne && score.p1_score === 10) || (score.p2_name === playerOne && score.p2_score === 10);
		});

		let p2_scores = scores.filter((score) => {
			return (score.p1_name === playerTwo && score.p1_score === 10) || (score.p2_name === playerTwo && score.p2_score === 10);
		});

		let p1_win = Math.round(p1_scores.length / scores.length * 100).toFixed(2);

		let p2_win = Math.round(p2_scores.length / scores.length * 100).toFixed(2);
		return (
			<table>
				<th>
					<td>{ playerOne }</td>
					<td>{ playerTwo }</td>
				</th>
				<tr>
					<td>{ p1_win }%</td>
					<td>{ p2_win }%</td>
				</tr>
			</table>
		)
	}

	render() {
		console.log(this.props);
		return (<div>
			{ this.calculateWinPercent() }
		</div>);
	}
}

export default Statistics;