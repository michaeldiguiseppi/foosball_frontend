import React, { Component } from 'react';
import './App.css';
import HomePageContainer from './containers/homePageContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomePageContainer />
      </div>
    );
  }
}

export default App;
