import React, { Component } from 'react';
import './App.css';
import firebase from '../../utils/firebase';
import AuthView from '../AuthView/AuthView';
import HomeView from '../HomeView/HomeView';
import CreateGameView from '../CreateGameView/CreateGameView';
import { Router } from "@reach/router";



class App extends Component {

  state = {
    user: {},
  }

  componentDidMount() {
    this.authListener();
  }

authListener() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      this.setState({user})
      console.log(user);
    } else {
      this.setState({user : null})
      console.log("User not logged in");
    }
  })
}

  render() {
    return (
      <div className="App">
        <Router>
          {this.state.user ? (<HomeView path="/" />) : (<AuthView path="/" />)}
          <CreateGameView path="/createGameView" />
        </Router>
      </div>
    );
  }
}

export default App;
