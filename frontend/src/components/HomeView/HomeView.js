import React, { Component } from 'react';
import { Link } from "@reach/router";
import firebase from '../../utils/firebase';
import GameCardOwner from '../GameCardOwner/GameCardOwner';
import GameCardGuesser from '../GameCardGuesser/GameCardGuesser';
import ButtonLarge from '../ButtonLarge/ButtonLarge';
import Lottie from 'react-lottie';
import {
  optionsBackgroundAnimPink,
  optionsBackgroundAnimGrey
} from '../utils/LottieOptions.js';
import {
  HomeViewContainer,
  ProfileTop,
  HomeGamesContainer,
  HomeButtonsWrapper
 } from './style';

class HomeView extends Component {

  state = {
    user : {},
    myGamesOwner: false,
    myGamesGuesser: false,
  }

  _isMounted = true;

  componentDidMount() {
    this.getYourGames();
    setTimeout(() => {
      this.checkIfRegistered();
    }, 500)
  }

  checkIfRegistered = () => {
    this.setState({user: this.props.user})
    const database = firebase.database();
    database.ref('users').off();
    database.ref('users').on('value', (data) => {
      const checkIfReg = data.val() && Object.values(data.val()).find(player => player.uid === this.state.user.uid);
      if (checkIfReg === null || checkIfReg === undefined) {
        let player = {
          uid: this.state.user.uid,
          name: this.state.user.displayName,
          photo: this.state.user.photoURL ? this.state.user.photoURL: "./images/profile-avatar.svg",
        }
        database.ref('users').push(JSON.parse(JSON.stringify(player)));
      } else {
        console.log("user is already registered");
      }
    })
  }

  getYourGames = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const database = firebase.database();
        const owner = database.ref(`games`).orderByChild('gameOwnerId').equalTo(`${user.uid}`);
        if (owner) {
          owner.on('value', (snapshot) => {
            if (this._isMounted) {
              if (snapshot.val()) {
                this.setState({myGamesOwner: Object.entries(snapshot.val())})
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
              }
            }
          })
        }
      };
    })
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
        <div className="bg">
          <Lottie
            style={{width: "100%", position: "absolute"}}
            options={optionsBackgroundAnimGrey}
            isStopped={false}
          />
          <Lottie
            style={{width: "100%", position: "absolute"}}
            options={optionsBackgroundAnimPink}
            isStopped={false}
          />
        </div>
        <ProfileTop>
          <div className="profilePic" style={{backgroundImage: user.photoURL ? `url("${this.props.user.photoURL}?height=500")` : `url("./images/profile-avatar.svg")`}}></div>
          <div className="userNameAndStats">
            <h1>{user ? user.displayName : "..."}</h1>
            <p>15 vinster / 23 förluster</p>
          </div>
        </ProfileTop>

        <HomeGamesContainer>
          <h2>Spel du hostar</h2>
          <div className="gamesWrapper">
            {myGamesOwner &&
              myGamesOwner.map((game, key) => {
                return <GameCardOwner
                  gameID={game[0]}
                  key={key}
                  image={game[1].secretPersonImage}
                  redirectTo={`/gameOwnerView/${game[0]}`}
                  remainingGuesses={`${20-game[1].remainingGuesses}/20`}
                  guesser={game[1].gameGuesserName}
                  opponentImage={game[1].gameGuesserImage}
                />
              })}
          </div>
        </HomeGamesContainer>

        <HomeGamesContainer>
          <h2>Spel du gissar på</h2>
          <div className="gamesWrapper">
            {myGamesGuesser &&
              myGamesGuesser.map((game, key) => {
              return <GameCardGuesser
                gameID={game[0]}
                key={key}
                image={game[1].secretPersonImage}
                redirectTo={`/gameGuesserView/${game[0]}`}
                remainingGuesses={`${20-game[1].remainingGuesses}/20`}
                owner={game[1].gameOwnerName}
                ownerImage={game[1].gameOwnerImage}
               />
            })}
            </div>
        </HomeGamesContainer>

        <HomeButtonsWrapper>
          <ButtonLarge buttonText={"Starta spel"} redirectTo={"createGameView"} />
          <ButtonLarge buttonText={"Spela öppet spel"} redirectTo={"publicGamesView"} />
        </HomeButtonsWrapper>

        <Link className="logout" onClick={this.logout} to="/">Logout</Link>

      </HomeViewContainer>
    )
  }
}

export default HomeView;
