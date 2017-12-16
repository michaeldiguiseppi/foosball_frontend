import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import AddPlayers from '../components/add_players/add_players';



class AddPlayerContainer extends Component {    
	componentWillMount() {
		this.props.userActions.fetchUsers();
	}

	render() {
		return (
		<div className="">
			{this.props.users.length > 0 ?
				<AddPlayers 
					users={this.props.users}
					addPlayer={this.props.userActions.addUser}
				 />
				: <div></div>
			}
		</div>
		);
	}
}

AddPlayerContainer.propTypes = {
  userActions: PropTypes.object,
  users: PropTypes.array
};

function mapStateToProps(state) {
	return {
		users: state.app.users
	};
}

function mapDispatchToProps(dispatch) {
	return {
		userActions: bindActionCreators(userActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddPlayerContainer);