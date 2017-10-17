import React, { Component } from 'react';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      newScore: {
        p1_id: 0,
        p2_id: 0,
        p1_score: 0,
        p2_score: 0,
        win_by_amount: 0,
      },
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);

  }

  componentDidMount() {
    this._getUsers();
  }

  _getUsers() {
    return fetch('http://localhost:9002/v1/users')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          users: responseJson.users,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _renderUsers() {
    return this.state.users.map((user) => {
      return (
        <option value={ user.id } key={ user.first_name + user.id }>{ user.first_name } { user.last_name }</option>
      )
    });
  }

  _handleSubmit(event) {
    event.preventDefault();

    console.log(this.state.newScore);
    return fetch('https://localhost:9002/v1/scores/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.newScore)
    })
    .then((response) => {
      console.log(response);
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let win_by_amount;

    if (!this.state.newScore.win_by_amount && (this.state.newScore.p1_score && this.state.newScore.p2_score)) {
      let p1_score = this.state.newScore.p1_score;
      let p2_score = this.state.newScore.p2_score;
      if (p1_score > p2_score) {
        win_by_amount = p1_score - p2_score;
        this.setState({
          newScore: {
            ...this.state.newScore,
            win_by_amount,
          }
        });
      } else {
        win_by_amount = p2_score - p1_score;
        this.setState({
          newScore: {
            ...this.state.newScore,
            win_by_amount,
          }
        });
      }
    }

    this.setState({
      newScore: {
        ...this.state.newScore,
        [name]: +value,
      }
    });
  }


  render() {
    return (
      <div>
        <form className="form-horizontal" onSubmit={ this._handleSubmit }>
          <fieldset>
            <div className="form-group">
              <div className="col-lg-3 col-lg-offset-3 col-sm-3 col-sm-offset-3">
                <select className="form-control text-center" id="select" name="p1_id" value={ this.state.newScore.p1_id } onChange={ this.handleInputChange }>
                  <option value="0"> -- Select a Player -- </option>
                  { this._renderUsers() }
                </select>
              </div>
              <div className="col-lg-3 col-sm-3">
                <select className="form-control text-center" id="select" name="p2_id" value={ this.state.newScore.p2_id } onChange={ this.handleInputChange }>
                  <option value="0"> -- Select a Player -- </option>
                  { this._renderUsers() }
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-lg-3 col-lg-offset-3 col-sm-3 col-sm-offset-3">
                <input type="text" className="form-control text-center" name="p1_score" placeholder="Score" value={ this.state.newScore.p1_score } onChange={ this.handleInputChange }/>
              </div>
              <div className="col-lg-3 col-sm-3">
                <input type="text" className="form-control text-center" name="p2_score" placeholder="Score" value={ this.state.newScore.p2_score } onChange={ this.handleInputChange }/>
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

export default HomePage;
