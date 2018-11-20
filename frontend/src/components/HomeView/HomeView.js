import React, { Component } from 'react';
import { Link } from "@reach/router";
import firebase from '../../utils/firebase';
import GameCardOwner from '../GameCardOwner/GameCardOwner';
import GameCardGuesser from '../GameCardGuesser/GameCardGuesser';
import GameCardInvited from '../GameCardInvited/GameCardInvited';
import GameCardFinished from '../GameCardFinished/GameCardFinished';
import SaveOnHomeScreen from '../SaveOnHomeScreen/SaveOnHomeScreen';
import ButtonLarge from '../ButtonLarge/ButtonLarge';
import DirectionButton from '../DirectionButton/DirectionButton';
import NoLinkButton from '../NoLinkButton/NoLinkButton';
import Lottie from 'react-lottie';
import {
  optionsBackgroundAnimPink,
  optionsBackgroundAnimGrey
} from '../utils/LottieOptions.js';
import {
  HomeViewContainer,
  ProfileTop,
  HomeGamesContainer,
  HomeButtonsWrapper,
  Settings,
  SettingsHeader,
  SettingsTitle
} from './style';

class HomeView extends Component {

  state = {
    user : {},
    myGamesOwner: false,
    myGamesGuesser: false,
    myGamesInvitedToPlay: false,
    me: false,
    myName: false,
    settingsSize: null,
    ownerFinished: false,
    guesserFinished: false,
  }

  _isMounted = true;

  componentDidMount() {
    this.getMe();
    this.getYourGames();
    this.getFinishedGames();
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
          photo: this.state.user.photoURL ? this.state.user.photoURL: "./bjornborgpixel.jpg",
          wins: 0,
          losses: 0,
        }
        database.ref('users').push(JSON.parse(JSON.stringify(player)));
      } else {
        console.log("user is already registered");

      }
    })
  }

  getMe = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database().ref(`users`).orderByChild('uid').equalTo(`${user.uid}`).on('value', (data) => {
          let user = Object.values(data.val());
          if (this._isMounted) {
            this.setState({me: user[0]})
          }
        })
      } else {
        firebase.database().ref(`users`).orderByChild('uid').equalTo(`${this.props.user.uid}`).on('value', (data) => {
          let user = Object.values(data.val());
          if (this._isMounted) {
            this.setState({
              me: user[0]}
            )
          }
        })
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
                let activeGames = [];
                Object.entries(snapshot.val()).forEach(game => {
                  if (game[1].theGuessersGuess === true || game[1].theGuessersGuess === false) {
                    return;
                  } else {
                    activeGames.push(game);
                  }
                })
                this.setState({myGamesOwner: activeGames})
              }
            }
          })
        }
        const guesser = database.ref(`games`).orderByChild('gameGuesserId').equalTo(`${user.uid}`);
        if (guesser) {
          guesser.on('value', (snapshot) => {
            if (this._isMounted) {
              if (snapshot.val()) {
                let activeGames = [];
                let invitedToPlay = [];
                Object.entries(snapshot.val()).forEach(game => {
                  if (game[1].theGuessersGuess === true || game[1].theGuessersGuess === false) {
                    return;
                  } else if (!game[1].waitingForAnswere) {
                    activeGames.push(game);
                  } else if (game[1].waitingForAnswere) {
                    invitedToPlay.push(game);
                  }
                })
                this.setState({
                  myGamesGuesser: activeGames,
                  myGamesInvitedToPlay: invitedToPlay,
                })
              }
            }
          })
        }
      };
    })
  }

  getFinishedGames = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        let ownerGamesFromDb = firebase.database().ref(`games`).orderByChild('gameOwnerId').equalTo(`${user.uid}`);
        ownerGamesFromDb.on('value', data => {
          let ownerFinished = [];
          Object.entries(data.val()).forEach(game => {
            if (game[1].theGuessersGuess !== null && game[1].theGuessersGuess !== undefined) {
              ownerFinished.push(game);
            }
          })
          this.setState({ownerFinished: ownerFinished})
        })
        let guesserGamesFromDb = firebase.database().ref(`games`).orderByChild('gameGuesserId').equalTo(`${user.uid}`);
        guesserGamesFromDb.on('value', data => {
          let guesserFinished = [];
          Object.entries(data.val()).forEach(game => {
            if (game[1].theGuessersGuess !== null && game[1].theGuessersGuess !== undefined) {
              guesserFinished.push(game);
            }
          })
          this.setState({guesserFinished: guesserFinished})
        })
      }
    })
  }



  logout = () => {
    firebase.auth().signOut();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }



  render() {

    const {myGamesOwner, myGamesGuesser, myGamesInvitedToPlay, me} = this.state;
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
          <Settings active={this.state.settingsSize} style={{backgroundImage: `url(${require('./bjornborgpixel.jpg')})`}}>
            <div className="overlay"></div>
            <div className="settingsContent">
              <SettingsHeader>
                <div onClick={() => this.setState({settingsSize: !this.state.settingsSize})}>
                  <DirectionButton
                    text={"Tillbaka"}
                    textColor={"#FFFFFF"}
                    arrowLeft={true}
                    arrowColor={"#FFFFFF"}/>
                </div>
                <Link className="logout" onClick={this.logout} to="/">Logga ut</Link>
              </SettingsHeader>
              <SettingsTitle>
                <h2>Byt profilbild</h2>
              </SettingsTitle>
              <SettingsTitle>
                <h2>Byt användarnamn</h2>
              </SettingsTitle>
              <SettingsTitle>
                <h2>Byt lösenord</h2>
              </SettingsTitle>
              <SettingsTitle>
                <h2>Radera konto</h2>
              </SettingsTitle>
              <NoLinkButton text={"Logga in med facebook"} color={"var(--victory-blue)"}/>
            </div>
          </Settings>
      <ProfileTop>
        <div onClick={() => this.setState({settingsSize: !this.state.settingsSize})} className="profilePic" style={{backgroundImage: user.photoURL ? `url("${this.props.user.photoURL}?height=500")` : `url("./bjornborgpixel.jpg")`}}></div>
        <div className="userNameAndStats">
          <h1>{user ? user.displayName : "..."}</h1>
          <p>{me && me.wins} {me.wins > 1 ? "vinster" : "vinst"} / {me && me.losses} {me.losses > 1 ? "förluster" : "förlust"}</p>
        </div>
      </ProfileTop>

      <HomeGamesContainer>
        <h2>Aktiva spel</h2>
        <div className="gamesWrapper">
          {/* Invited to play */}
          {myGamesInvitedToPlay &&
            myGamesInvitedToPlay.map((game, key) => {
              return <GameCardInvited
                gameID={game[0]}
                key={key}
                redirectTo={`/gameGuesserView/${game[0]}`}
                image={game[1].secretPersonImage}
                owner={game[1].gameOwnerName}
              />
            })}
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
            <HomeGamesContainer>
            <h2>Spela igen</h2>
              <div className="gamesWrapper">
                {this.state.ownerFinished &&
                  this.state.ownerFinished.map((game, key) => {
                    return <GameCardFinished
                      user={this.props.user}
                      gameID={game[0]}
                      key={key}
                      image={game[1].secretPersonImage}
                      owner={game[1].gameOwnerName}
                      ownerImage={game[1].gameOwnerImage}
                      guesser={game[1].gameGuesserName}
                      guesserImage={game[1].gameGuesserImage}
                    />
                  })}
                {this.state.guesserFinished &&
                  this.state.guesserFinished.map((game, key) => {
                    return <GameCardFinished
                      user={this.props.user}
                      gameID={game[0]}
                      key={key}
                      image={game[1].secretPersonImage}
                      owner={game[1].gameOwnerName}
                      ownerImage={game[1].gameOwnerImage}
                      guesser={game[1].gameGuesserName}
                      guesserImage={game[1].gameGuesserImage}
                    />
                  })}
                </div>
              </HomeGamesContainer>

              <HomeButtonsWrapper>
                <ButtonLarge buttonText={"Starta spel"} redirectTo={"createGameView"} />
                <ButtonLarge buttonText={"Spela öppet spel"} redirectTo={"publicGamesView"} />
              </HomeButtonsWrapper>

              {!myGamesOwner && <SaveOnHomeScreen/>}

            </HomeViewContainer>
          )
        }
      }

      export default HomeView;
