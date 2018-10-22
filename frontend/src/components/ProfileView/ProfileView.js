import React, { Component } from 'react';
import { Link } from "@reach/router";
import firebase from '../../utils/firebase';
import './ProfileView.css';

class ProfileView extends Component {

  state = {
    isMounted: false,
    user : false,
    myGamesOwner: false,
    myGamesGuesser: false,
  }

  _isMounted = true;

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const database = firebase.database();
        const owner = database.ref(`games`).orderByChild('gameOwnerId').equalTo(`${user.uid}`);
        if (owner) {
          owner.on('value', (snapshot) => {
            if (this._isMounted) {
              this.setState({myGamesOwner: Object.entries(snapshot.val())})
              console.log(this.state.myGamesOwner);
            }
          })
        }
        const guesser = database.ref(`games`).orderByChild('gameGuesserId').equalTo(`${user.uid}`);
        if (guesser) {
          guesser.on('value', (snapshot) => {
            if (this._isMounted) {
              this.setState({myGamesGuesser: Object.entries(snapshot.val())})
              console.log(this.state.myGamesGuesser);
            }
          })
        }
      } else {
        console.log("no user logged in");
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
    return (
      <div className="profileView">
          <h1> Hello {this.props.user.displayName} </h1>
          <h2>Games you host</h2>
          <div>
            {this.state.myGamesOwner &&
            this.state.myGamesOwner.map((game, key) => {
              return <div key={key} className="goToGame">
                <Link to={`/gameOwnerView/${game[0]}`}>{game[1].secretPerson}</Link><br/>
              </div>
            })}
          </div>
          <h2>Games you Play</h2>
          <div>
            {this.state.myGamesGuesser &&
            this.state.myGamesGuesser.map((game, key) => {
              return <div key={key} className="goToGame">
                <Link to={`/gameGuesserView/${game[0]}`}>{game[1].secretPerson}</Link><br/>
              </div>
            })}
          </div>
          <br/>
          <h2>Logout</h2>
          <Link onClick={this.logout} to="/">Logout</Link>
      </div>
    )
  }
}

export default ProfileView;
