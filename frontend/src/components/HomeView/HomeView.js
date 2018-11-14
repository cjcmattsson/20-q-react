import React, { Component } from 'react';
import { Link } from "@reach/router";
import firebase from '../../utils/firebase';
import GameCardOwner from '../GameCardOwner/GameCardOwner';
import GameCardGuesser from '../GameCardGuesser/GameCardGuesser';
import GameCardInvited from '../GameCardInvited/GameCardInvited';
import GameCardFinished from '../GameCardFinished/GameCardFinished';
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
  HomeButtonsWrapper,
  Settings
} from './style';

class HomeView extends Component {

  state = {
    user : {},
    myGamesOwner: false,
    myGamesGuesser: false,
    myGamesInvitedToPlay: false,
    finishedGames: false,
    me: false,
    settingsSize: null,
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
          photo: this.state.user.photoURL ? this.state.user.photoURL: "./images/profile-avatar.svg",
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
            this.setState({me: user[0]})
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
      let myFinishedGames = [];
      if (user) {
        let gamesFromDb = firebase.database().ref(`games`);
        gamesFromDb.on('value', data => {
          if (data.val()) {
            let allGames = Object.entries(data.val());
            allGames.forEach(game => {
              if (game[1].gameGuesserId === this.props.user.uid || game[1].gameOwnerId === this.props.user.uid) {
                if (game[1].theGuessersGuess) {
                  myFinishedGames.push(game);
                }
              }
            })
          }
        })
      }
      this.setState({finishedGames: myFinishedGames})
    })
  }



  logout = () => {
    firebase.auth().signOut();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }



  render() {

    const {myGamesOwner, myGamesGuesser, myGamesInvitedToPlay, finishedGames, me} = this.state;
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
              <p onClick={() => this.setState({settingsSize: !this.state.settingsSize})}>CLOSE</p>
            </div>
          </Settings>
      <ProfileTop>
        <div onClick={() => this.setState({settingsSize: !this.state.settingsSize})} className="profilePic" style={{backgroundImage: user.photoURL ? `url("${this.props.user.photoURL}?height=500")` : `url("./images/profile-avatar.svg")`}}></div>
        <div className="userNameAndStats">
          <h1>{user ? user.displayName : "..."}</h1>
          <p>{me && me.wins} {me.wins > 1 ? "vinster" : "vinst"} / {me && me.losses} {me.losses > 1 ? "förluster" : "förlust"}</p>
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
            {/* Invited to play */}
            <div className="gamesWrapper">
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
              </div>
            </HomeGamesContainer>
            <HomeGamesContainer>
              <h2>Spela igen!</h2>
              <div className="gamesWrapper">
                {finishedGames &&
                  finishedGames.map((game, key) => {
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

              <Link className="logout" onClick={this.logout} to="/">Logout</Link>

            </HomeViewContainer>
          )
        }
      }

      export default HomeView;
