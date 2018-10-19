import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class AuthView extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

state = {
  email:'',
  password:'',
}

uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
}

login(e) {
  e.preventDefault();
  const promise = firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
  promise.catch(e => console.log(e.message));
}

signUp(e) {
  e.preventDefault();
  const promise = firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
  promise.catch(e => console.log(e.message));
}

handleChange(e) {
  this.setState({ [e.target.name] : e.target.value,});
}

  render() {
    const {email, password} = this.state;
    return (
      <div className="authView">
        <h1>LOGIN VIEW</h1>
        <form className="loginForm">
          <input value={email} onChange={this.handleChange} type="email" name="email"/>
          <input value={password} onChange={this.handleChange} type="password" name="password"/>
          <div className="formButtons">
            <button type="submit" onClick={this.login}>LOGIN</button>
            <button onClick={this.signUp}>SIGN UP</button>
          </div>
        </form>

        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    )
  }
}

export default AuthView;
