import React, { Component } from 'react';
import './CreateGameView.css';
import firebase from '../../utils/firebase';

class CreateGameView extends Component {

  state = {
    secretPerson : "",
  }

  handleChange = (e) => {
    this.setState({ [e.target.name] : e.target.value,});
  }

  createGame = (e) => {
    e.preventDefault();
    const database = firebase.database();
    const games = database.ref('games');
    const game = {
      secretPerson: this.state.secretPerson,
      remainingGuesses: 20,
      gameOwnerId: firebase.auth().currentUser.uid,
      gameOwnerName: firebase.auth().currentUser.displayName,
    }
    games.push(game);
    this.setState({secretPerson: ""})
  }

  render() {
    return (
      <div className="createGameView">
        <h1>Create Game!! :D</h1>
        <form>
          <input value={this.state.secretPerson}  onChange={this.handleChange} name="secretPerson" type="text" className="person"/>
          <button type="submit" onClick={this.createGame}>Start game</button>
        </form>
      </div>
    )
  }
}

export default CreateGameView;
