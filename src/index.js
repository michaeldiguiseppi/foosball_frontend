import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './index.css';
import App from './App';
import ScoreList from './components/score_list/score_list';
import registerServiceWorker from './registerServiceWorker';

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
          </ul>
          <ul className="nav navbar-nav navbar-right">
          </ul>
        </div>
      </div>
    </nav>
  )
}

ReactDOM.render(
  <Router>
    <div>
      <PrimaryLayout></PrimaryLayout>

      <Route exact path="/" component={App}/>
      <Route path="/scores/all" component={ScoreList}/>
    </div>
  </Router>,
  document.getElementById('root'));
  // <BrowserRouter>
  //   <PrimaryLayout>
  //     <Route exact path="/" component={App}>
  //       <Route path="/scores/all" component={ScoreList}/>
  //     </Route>
  //   </PrimaryLayout>
  // </BrowserRouter>,
  // document.getElementById('root'));
registerServiceWorker();
