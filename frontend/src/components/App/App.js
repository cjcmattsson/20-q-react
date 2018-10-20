import React, { Component } from 'react';
import './App.css';
import firebase from '../../utils/firebase';
import AuthView from '../AuthView/AuthView';
import HomeView from '../HomeView/HomeView';
import CreateGameView from '../CreateGameView/CreateGameView';
import PublicGamesView from '../PublicGamesView/PublicGamesView';
import ProfileView from '../ProfileView/ProfileView';
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
    const {user} = this.state;
    return (
      <div className="App">
        <Router>
          {user ? (<HomeView path="/" />) : (<AuthView path="/" />)}
          <CreateGameView path="/createGameView" />
          <ProfileView user={user} path="/profileView" />
          <PublicGamesView path="/publicGamesView" />
        </Router>
      </div>
    );
  }
}

export default App;
