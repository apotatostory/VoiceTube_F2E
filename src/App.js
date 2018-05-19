import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Home from './js/Page/Home'
import Qrcode from './js/Page/Qrcode'

class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <Router>
            <div>
              <div className="sidenav">
                <img
                  className="container img-fluid rounded-circle"
                  src="img/dog.png"
                  alt="Card image"/>
                <Link to="/">
                  <h2>Tim's Blog</h2>
                </Link>
                <Link to="/1">Intro</Link>
                <Link to="/2">Contact</Link>
                <Link to="/3">QRCode</Link>

              </div>
              <div className="main">
                <Route exact path="/" component={Home}/>
                <Route path="/1" component={Home}/>
                <Route path="/2" component={About}/>
                <Route path="/3" component={Qrcode}/>
              </div>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

class About extends Component {
  render() {
    return (
      <div>
        <h2>Sidenav Example</h2>
        <p>This sidenav is always shown.</p>
        <h2>Repos</h2>
      </div>
    )
  }
}

export default App;
