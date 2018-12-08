import React, { Component } from 'react';

class AddScore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newScore: {
        p1_id: 0,
        p2_id: 0,
        p1_score: 0,
        p2_score: 0,
        win_by_amount: 0,
        game_type: 'foosball'
      }
    }
    this._handleScoreSubmit = this._handleScoreSubmit.bind(this);
  }

  componentWillMount() {
    console.warn(this.props.userActions);
    this.props.userActions.fetchUsers();
  }


  _renderUsers() {
    if (this.props.users && this.props.users.length) {
      return this.props.users.map((user) => {
        return (
          <option value={ user.id } key={ user.first_name + user.id }>{ user.first_name } { user.last_name }</option>
        )
      });
    }
  }

  _handleScoreSubmit(event) {
    event.preventDefault();

    let newScore = {
        p1_id: this.refs.p1_id.value,
        p2_id: this.refs.p2_id.value,
        p1_score: this.refs.p1_score.value,
        p2_score: this.refs.p2_score.value,
        game_type: this.refs.game_type.value,
    }

    if (!newScore.win_by_amount && (newScore.p1_score && newScore.p2_score)) {
      let p1_score = newScore.p1_score;
      let p2_score = newScore.p2_score;
      let win_by_amount;
      if (p1_score > p2_score) {
        win_by_amount = p1_score - p2_score;
        newScore = {
            ...newScore,
            win_by_amount,
        }
      } else {
        win_by_amount = p2_score - p1_score;
        newScore = {
            ...newScore,
            win_by_amount,
        }
      }
    }

    return this.props.addScore(newScore)
      .then(() => {
        document.getElementById("score_form").reset();
      });
  }

  render() {
    return (
      <div className="container">
        <h3>Add Scores</h3>
        <hr />
        <form id="score_form" onSubmit={ this._handleScoreSubmit }>
          <fieldset>
            <div className="form-group">
              <div className="col-lg-4 col-sm-4">
                <select className="form-control text-center" id="select" name="p1_id" ref="p1_id">
                  <option value="0" className="text-center"> -- Select Player 1 -- </option>
                  { this._renderUsers() }
                </select>
              </div>
              <div className="col-lg-2 col-sm-2">
                <input type="number" pattern="[0-9]*" className="form-control text-center" name="p1_score" placeholder="Player 1 Score" ref="p1_score" autoComplete="off"/>
              </div>
              <div className="col-lg-2 col-sm-2">
                <input type="number" pattern="[0-9]*" className="form-control text-center" name="p2_score" placeholder="Player 2 Score" ref="p2_score" autoComplete="off"/>
              </div>
              <div className="col-lg-4 col-sm-4">
                <select className="form-control text-center" id="select" name="p2_id" ref="p2_id">
                  <option value="0" className="text-center"> -- Select Player 2 -- </option>
                  { this._renderUsers() }
                </select>
              </div>
              <div className="form-group">
                <div className="col-lg-4 col-lg-offset-4 col-sm-4 col-sm-offset-4 pad-top">
                    <select className="form-control text-center" id="select" name="game_type" ref="game_type">
                      <option value="0" className="text-center"> -- Select Game Type -- </option>
                      <option value="foosball" className="text-center">Foosball</option>
                      <option value="pingpong" className="text-center">Ping Pong</option>
                    </select>
                  </div>
                </div>
              </div>
            <div className="form-group">
              <div className="col-lg-4 col-lg-offset-4 col-sm-4 col-sm-offset-4">
                <button type="reset" className="btn btn-default">Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default AddScore;
