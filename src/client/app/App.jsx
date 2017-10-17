import React from 'react';
import { Route, Link, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Main from './Main.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import ProductDetails from './ProductDetails.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      loggedIn: false,
      user: ''
    };

  }

  handleSignUp(user) {
    axios.post('/signup', user)
      .then((res) => {
        this.setState({
          loggedIn: true,
          user: user.username
        });
      })
      .catch((err) => {
        console.log(err);
      });

  }

  handleLogIn(user) {
    if (user !== undefined) {
      axios.post('/login', user)
        .then((res) => {
          this.setState({
            loggedIn: true,
            user: user.username
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  login(username) {
    this.setState({
      loggedIn: true,
      user: username
    });
  }

  handleLogOut() {
    axios.get('/logout')
      .then((res) => {
        this.setState({
          loggedIn: false,
          user: null
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Router>
            <Switch>
              <Route exact path="/" render={(props) => (<Main user={this.state.user} loggedIn={this.state.loggedIn} handleLogOut={this.handleLogOut} {...props}/>)} />
              <Route exact path="/signupUser" render={(props) => (<Signup loggedIn={this.state.loggedIn} handleSignUp={this.handleSignUp} {...props}/>)} />
              <Route exact path="/loginUser" render={(props) => (<Login handleLogIn={this.handleLogIn} loggedIn={this.state.loggedIn} {...props}/>)} />
              <Route exact path="/productDetails" render={(props) => (<ProductDetails {...props}/>)} />
              <Route exact path="/loggedIn/:userName" render={(props) => (<Login login={this.login} loggedIn={this.state.loggedIn} {...props}/>)}/>

            </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
