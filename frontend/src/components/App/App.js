import React, { Component } from 'react';
import './App.css';
import firebase from '../../utils/firebase';
import AuthView from '../AuthView/AuthView';
import HomeView from '../HomeView/HomeView';
import CreateGameView from '../CreateGameView/CreateGameView';
import PublicGamesView from '../PublicGamesView/PublicGamesView';
import GameGuesserView from '../GameGuesserView/GameGuesserView';
import GameOwnerView from '../GameOwnerView/GameOwnerView';
import FadeTransitionRouter from './FadeTransitionRouter';

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
        this.setState({user});
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
      <div className="app">
        <FadeTransitionRouter>
          {user ? (<HomeView user={user} path="/" />) : (<AuthView path="/" />)}
          <CreateGameView className="page" user={user} path="/createGameView" />
          <PublicGamesView className="page" user={user} path="/publicGamesView" />
          <GameGuesserView className="page" path="/gameGuesserView/:gameID" />
          <GameOwnerView className="page" path="/gameOwnerView/:gameID" />
        </FadeTransitionRouter>
      </div>
    );
  }
}

export default App;
