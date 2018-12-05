import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import ScoreListContainer from './containers/scoreListContainer';
import FoosballScoreList from './containers/FoosballScoreList';
import PingPongScoreList from './containers/PingPongScoreList';
import AddPlayerContainer from './containers/addPlayerContainer';
import StatsContainer from './containers/statsContainer';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const store = configureStore();

const PrimaryLayout = () => {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to="/" className="navbar-brand">Foosball</Link>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
          <ul className="nav navbar-nav">
            <li><Link to="/scores/all">All Scores</Link></li>
            <li><Link to="/scores/pingpong">Ping Pong</Link></li>
            <li><Link to="/scores/foosball">Foosball</Link></li>
            <li><Link to="/players/add">Add Players</Link></li>
            <li><Link to="/stats">Stats</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
          </ul>
        </div>
      </div>
    </nav>
  )
}

ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <div>
        <PrimaryLayout></PrimaryLayout>
        <Route exact path="/" component={App}/>
        <Route path="/scores/all" component={ScoreListContainer}/>
        <Route path="/scores/foosball" component={FoosballScoreList}/>
        <Route path="/scores/pingpong" component={PingPongScoreList}/>
        <Route path="/players/add" component={AddPlayerContainer}/>
        <Route path="/stats" component={StatsContainer}/>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();