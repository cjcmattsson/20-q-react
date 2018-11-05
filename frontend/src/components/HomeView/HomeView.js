import React, { Component } from 'react';
import { Link } from "@reach/router";
import firebase from '../../utils/firebase';
import GameCardLink from '../GameCardLink/GameCardLink';
import ButtonLarge from '../ButtonLarge/ButtonLarge';
import {
  HomeViewContainer,
  ProfileTop,
  HomeGamesContainer,
  HomeButtonsWrapper
 } from './style';

class HomeView extends Component {

  state = {
    user : false,
    myGamesOwner: false,
    myGamesGuesser: false,
  }

  _isMounted = true;

  componentDidMount() {
    this.getUser();
    this.checkIfUserIsRegistered();
  }

  getUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const database = firebase.database();
        const owner = database.ref(`games`).orderByChild('gameOwnerId').equalTo(`${user.uid}`);
        if (owner) {
          owner.on('value', (snapshot) => {
            if (this._isMounted) {
              if (snapshot.val()) {
                this.setState({myGamesOwner: Object.entries(snapshot.val())})
                console.log(this.state.myGamesOwner);
              }
            }
          })
        }
        const guesser = database.ref(`games`).orderByChild('gameGuesserId').equalTo(`${user.uid}`);
        if (guesser) {
          guesser.on('value', (snapshot) => {
            if (this._isMounted) {
              if (snapshot.val()) {
                this.setState({myGamesGuesser: Object.entries(snapshot.val())})
                console.log(this.state.myGamesGuesser);
              }
            }
          })
        }
      } else {
        console.log("no user logged in");
      }
    });
  }

  checkIfUserIsRegistered = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const database = firebase.database();
        database.ref('users').on('value', (data) => {
          const checkIfReg = data.val() && Object.values(data.val()).find(player => player.uid === user.uid);
          if (checkIfReg === null || checkIfReg === undefined) {
            let player = {
              uid: user.uid,
              name: user.displayName,
              photo: user.photoURL ? user.photoURL: "./images/profile-avatar.svg",
            }
            database.ref('users').push(player);
          } else {
            console.log("user is already registered");
          }
        });
      }
    });
  }

  logout = () => {
    firebase.auth().signOut();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  render() {

    const {myGamesOwner, myGamesGuesser} = this.state;
    const {user} = this.props;
    return (
      <HomeViewContainer>

        <ProfileTop>
          <div className="profilePic" style={{backgroundImage: this.props.user.photoURL ? `url("${this.props.user.photoURL}?height=500")` : `url("./images/profile-avatar.svg")`}}></div>
          <div className="userNameAndStats">
            <h1>{user && user.displayName}</h1>
            <p>15 vinster / 23 förluster</p>
          </div>
        </ProfileTop>

        <HomeGamesContainer>
          <h2>Spel du hostar</h2>
          <div className="gamesWrapper">
            {myGamesOwner &&
              myGamesOwner.map((game, key) => {
                return <GameCardLink
                  key={key}
                  image={game[1].secretPersonImage}
                  redirectTo={`/gameOwnerView/${game[0]}`}
                  remainingGuesses={`${20-game[1].remainingGuesses}/20`}
                  guesser={game[1].gameGuesserName} />
              })}
          </div>
        </HomeGamesContainer>

        <HomeGamesContainer>
          <h2>Spel du gissar på</h2>
          <div className="gamesWrapper">
            {myGamesGuesser &&
              myGamesGuesser.map((game, key) => {
              return <GameCardLink
                key={key}
                image={game[1].secretPersonImage}
                redirectTo={`/gameGuesserView/${game[0]}`}
                remainingGuesses={`${20-game[1].remainingGuesses}/20`}
                owner={game[1].gameOwnerName} />
            })}
            </div>
        </HomeGamesContainer>

        <HomeButtonsWrapper>
          <ButtonLarge buttonText={"Starta nytt spel"} redirectTo={"createGameView"} />
          <ButtonLarge buttonText={"Spela öppet spel"} redirectTo={"publicGamesView"} />
        </HomeButtonsWrapper>

        <Link onClick={this.logout} to="/">Logout</Link>

      </HomeViewContainer>
    )
  }
}

export default HomeView;
