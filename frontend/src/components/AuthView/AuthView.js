import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import './AuthView.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class AuthView extends Component {

state = {
  email:'',
  password:'',
  username:'',
  showSignUpFields: false,
}

uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
}

login = (e) => {
  e.preventDefault();
  const promise = firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
  promise.catch(e => console.log(e.message));
}

signUp = (e) => {
  e.preventDefault();
  firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then(() => {
    var user = firebase.auth().currentUser
    user.updateProfile({displayName: this.state.username})
    }).catch(e => console.log(e.message));
  }


handleChange = (e) => {
  this.setState({ [e.target.name] : e.target.value,});
}

showSignUpFields = () => {
  this.setState({showSignUpFields: !this.state.showSignUpFields})
}

  render() {
    const {email, password, username, showSignUpFields} = this.state;
    return (
      <div className="authView">
        <h1>LOGIN VIEW</h1>
        <form className="loginForm">
          <div className="userInputFields">
            <input value={username}  onChange={this.handleChange} style={{display: showSignUpFields ? "block" : "none"}} type="text" name="username" placeholder="name"/>
            <input value={email} onChange={this.handleChange} type="email" name="email" placeholder="email"/>
            <input value={password} onChange={this.handleChange} type="password" name="password" placeholder="password"/>
          </div>
          <div className="formButtons">
            <button className="loginButton" style={{display: showSignUpFields ? "none" : "block"}} type="submit" onClick={this.login}>LOGIN</button>
            <button className="signUpButton" style={{display: showSignUpFields ? "block" : "none"}} onClick={this.signUp}>SIGN UP</button>
          </div>
        </form>
        <p onClick={this.showSignUpFields}>{showSignUpFields ? "Dont sign up with email" : "Sign up with email"}</p>

        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    )
  }
}

export default AuthView;
