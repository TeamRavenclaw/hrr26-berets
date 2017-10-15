import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    if (this.props.match.params.userName) {
      this.props.login(this.props.match.params.userName);

    }
    this.logIn = this.logIn.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.func = this.func.bind(this);
    this.googleLogIn = this.googleLogIn.bind(this);
  }

  logIn(e) {
    //e.preventDefault();
    let user = { username: this.state.username, password: this.state.password };
    this.props.handleLogIn(user);
    this.setState({ password: '' });

  }

  googleLogIn(e) {
    e.preventDefault();
    alert('hhhh');
    this.props.handleLogIn();
  }

  handleUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  func(e) {

    console.log('cool');
    this.props.handleLogIn();
    //e.preventDefault()
    // console.log('axios', axios)
  // axios.get('/auth/google', {
  //   params: {
  //     name: 'meghana'
  //   }
  // })
  // .then(function (response) {
  //   console.log('response', response);
  // })
  // .catch(function (error) {
  //   console.log('error in loginjsx');
  //});
  }

  render() {
    console.log('this.props', this.props);
    if (this.props.loggedIn) {
      return <Redirect to='/'/>;
    }
    // if (this.props.match.params.userName) {
    //   this.props.login();
    //   return <Redirect to='/'/>;
    // }
    return (
      <MuiThemeProvider>
        <div>
          <div className="wrapper login-forms-container">
            <div className="login-forms">
              <br />
              <br />
              <h1>LOGIN</h1>
              <form onSubmit={this.logIn}>
                <label>email</label>
                <br />
                <input type="email" placeholder="name@example.com" onChange={this.handleUsername} value={this.state.username} required/>
                <br />
                <label>password</label>
                <br />
                <input type="password" name="password" value={this.state.password} onChange={this.handlePassword} required/>
              </form>
              <div className="login-form-button">
                <FlatButton
                  label="Submit"
                  primary={true}
                  onClick={() => {
                    this.logIn();
                  }}
                />
              </div>
              <a href='/auth/google' className="btn btn-danger">Sign In with Google</a>
              <br />
              <br />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default Login;
