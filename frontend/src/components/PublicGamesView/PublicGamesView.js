import React, { Component } from 'react';
import firebase from '../../utils/firebase';
import { PublicGamesViewContainer } from './style';
import { Link } from '@reach/router';

class PublicGamesView extends Component {

  state = {
    allGames : [],
    user: false,
  }

  _isMounted = true;

  componentDidMount() {
    const database = firebase.database();
    const games = database.ref('games');
    games.on('value', (data) => {
      console.log(Object.entries(data.val()))
      if (this._isMounted) {
        this.setState({allGames : Object.entries(data.val())})
      }
    });
    this.getUser();
  }

  getUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        if (this._isMounted) {
        this.setState({user})
      }
      } else {
        console.log("no user logged in");
      }
    });
  }

  joinGame = (game) => {
    firebase.database().ref(`games/${game}`).on('value', (data) => {
      console.log(data.val());
    })
    firebase.database().ref(`games/${game}`)
    .update({
      gameGuesserId: this.state.user.uid,
      gameGuesserName: this.props.user.displayName,
      gameGuesserImage: this.props.user.photoURL ? this.props.user.photoURL : "./images/profile-avatar.svg",
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <PublicGamesViewContainer>
        <h2>Gå med ett öppet spel</h2>
        {this.state.allGames &&
          this.state.allGames.map((game, key) => {
            return (
            <div key={key}>
              <h2 onClick={() => this.joinGame(game[0])}>Play with: {game[1].gameOwnerName}</h2>
              <p>(pssst! The correct answere is {game[1].secretPerson})</p>
              {this.props.user.uid===game[1].gameOwnerId
                ? <Link to={`/gameOwnerView/${game[0]}`}>Go to your game!</Link>
                : <Link to={`/gameGuesserView/${game[0]}`}>Join game - start guessing!</Link>
              }
            </div>)
          })
        }
      </PublicGamesViewContainer>
    )
  }
}

export default PublicGamesView;
